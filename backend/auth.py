import hashlib
import hmac
import json
import os
import re
import secrets
import sqlite3
import time
from datetime import datetime, timezone

from bottle import HTTPResponse, get, hook, post, request, response

DB_PATH = os.environ.get("KONTAKTFINDER_DB", "/data/kontaktfinder.sqlite")
SESSION_COOKIE = "kf_session"
SESSION_TTL = 60 * 60 * 24 * 7
PBKDF2_ITERATIONS = 260_000

os.makedirs(os.path.dirname(DB_PATH) or ".", exist_ok=True)


def _db():
    conn = sqlite3.connect(DB_PATH, timeout=30)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    conn.execute("PRAGMA journal_mode = WAL")
    return conn


def _json_response(payload, status=200):
    return HTTPResponse(
        status=status,
        body=json.dumps(payload, ensure_ascii=False),
        headers={"Content-Type": "application/json; charset=utf-8"},
    )


def _password_hash(password):
    salt = secrets.token_bytes(16)
    digest = hashlib.pbkdf2_hmac(
        "sha256", password.encode("utf-8"), salt, PBKDF2_ITERATIONS
    )
    return "pbkdf2_sha256$%s$%s$%s" % (
        PBKDF2_ITERATIONS,
        salt.hex(),
        digest.hex(),
    )


def _password_ok(password, encoded):
    try:
        algorithm, iterations, salt_hex, digest_hex = encoded.split("$", 3)
        if algorithm != "pbkdf2_sha256":
            return False
        candidate = hashlib.pbkdf2_hmac(
            "sha256",
            password.encode("utf-8"),
            bytes.fromhex(salt_hex),
            int(iterations),
        )
        return hmac.compare_digest(candidate.hex(), digest_hex)
    except Exception:
        return False


def _init_db():
    now = int(time.time())
    with _db() as conn:
        conn.executescript(
            """
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL UNIQUE COLLATE NOCASE,
                password_hash TEXT NOT NULL,
                role TEXT NOT NULL DEFAULT 'user',
                active INTEGER NOT NULL DEFAULT 1,
                created_at INTEGER NOT NULL,
                updated_at INTEGER NOT NULL
            );

            CREATE TABLE IF NOT EXISTS sessions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                token_hash TEXT NOT NULL UNIQUE,
                user_id INTEGER NOT NULL,
                expires_at INTEGER NOT NULL,
                created_at INTEGER NOT NULL,
                FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
            );

            CREATE TABLE IF NOT EXISTS contacts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                domain TEXT NOT NULL,
                title TEXT,
                emails TEXT NOT NULL DEFAULT '[]',
                phones TEXT NOT NULL DEFAULT '[]',
                linkedins TEXT NOT NULL DEFAULT '[]',
                twitters TEXT NOT NULL DEFAULT '[]',
                instagrams TEXT NOT NULL DEFAULT '[]',
                facebooks TEXT NOT NULL DEFAULT '[]',
                youtubes TEXT NOT NULL DEFAULT '[]',
                githubs TEXT NOT NULL DEFAULT '[]',
                technologies TEXT NOT NULL DEFAULT '[]',
                raw_json TEXT NOT NULL DEFAULT '{}',
                last_task_id INTEGER,
                created_at INTEGER NOT NULL,
                updated_at INTEGER NOT NULL,
                UNIQUE(user_id, domain),
                FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
            );

            CREATE TABLE IF NOT EXISTS synced_tasks (
                user_id INTEGER NOT NULL,
                task_id INTEGER NOT NULL,
                synced_at INTEGER NOT NULL,
                PRIMARY KEY(user_id, task_id),
                FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
            );

            CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token_hash);
            CREATE INDEX IF NOT EXISTS idx_contacts_user ON contacts(user_id);
            CREATE INDEX IF NOT EXISTS idx_contacts_domain ON contacts(domain);
            """
        )
        admin = conn.execute(
            "SELECT id FROM users WHERE username = ? COLLATE NOCASE", ("admin",)
        ).fetchone()
        if not admin:
            conn.execute(
                """
                INSERT INTO users(username, password_hash, role, active, created_at, updated_at)
                VALUES (?, ?, 'admin', 1, ?, ?)
                """,
                ("admin", _password_hash("admin"), now, now),
            )
        conn.commit()


_init_db()


def _token_hash(token):
    return hashlib.sha256(token.encode("utf-8")).hexdigest()


def _current_user():
    token = request.get_cookie(SESSION_COOKIE)
    if not token:
        return None
    now = int(time.time())
    with _db() as conn:
        row = conn.execute(
            """
            SELECT u.id, u.username, u.role, u.active
            FROM sessions s
            JOIN users u ON u.id = s.user_id
            WHERE s.token_hash = ? AND s.expires_at > ? AND u.active = 1
            """,
            (_token_hash(token), now),
        ).fetchone()
    return dict(row) if row else None


def _require_user():
    user = _current_user()
    if not user:
        raise _json_response({"message": "Sesja wygasła. Zaloguj się ponownie."}, 401)
    request.environ["kontaktfinder.user"] = user
    return user


def _require_admin():
    user = _require_user()
    if user["role"] != "admin":
        raise _json_response({"message": "Brak uprawnień administratora."}, 403)
    return user


def _task_belongs_to_user(task_id, user_id):
    try:
        from botasaurus_server.db_setup import Session
        from botasaurus_server.models import Task

        with Session() as session:
            task = session.query(Task.meta_data).filter(Task.id == int(task_id)).first()
            if not task:
                return False
            metadata = task[0] or {}
            return int(metadata.get("kf_user_id", -1)) == int(user_id)
    except Exception:
        return False


def _extract_task_ids():
    path = request.path
    ids = []
    match = re.search(r"/api/(?:ui/)?tasks/(\d+)", path)
    if match:
        ids.append(int(match.group(1)))

    body = request.json if request.method in ("POST", "PATCH", "DELETE") else None
    if isinstance(body, dict):
        if body.get("task_id"):
            try:
                ids.append(int(body["task_id"]))
            except Exception:
                pass
        for key in ("task_ids", "pending_task_ids", "progress_task_ids"):
            values = body.get(key)
            if isinstance(values, list):
                for value in values:
                    try:
                        ids.append(int(value))
                    except Exception:
                        pass
        all_tasks = body.get("all_tasks")
        if isinstance(all_tasks, list):
            for item in all_tasks:
                if isinstance(item, dict) and item.get("id"):
                    try:
                        ids.append(int(item["id"]))
                    except Exception:
                        pass
    return list(dict.fromkeys(ids))


@hook("before_request")
def protect_api():
    if request.method == "OPTIONS":
        return
    path = request.path
    if not path.startswith("/api"):
        return
    if path in ("/api/auth/login", "/api/ui/config"):
        return

    user = _require_user()

    if path.startswith("/api/admin/") and user["role"] != "admin":
        raise _json_response({"message": "Brak uprawnień administratora."}, 403)

    if path.startswith("/api/tasks") or path.startswith("/api/ui/tasks"):
        for task_id in _extract_task_ids():
            if not _task_belongs_to_user(task_id, user["id"]):
                raise _json_response({"message": "Nie znaleziono zadania."}, 404)


@get("/api/auth/me")
def auth_me():
    user = _require_user()
    return _json_response({"user": user})


@post("/api/auth/login")
def auth_login():
    payload = request.json or {}
    username = str(payload.get("username", "")).strip()
    password = str(payload.get("password", ""))

    with _db() as conn:
        row = conn.execute(
            """
            SELECT id, username, password_hash, role, active
            FROM users
            WHERE username = ? COLLATE NOCASE
            """,
            (username,),
        ).fetchone()

        if not row or not row["active"] or not _password_ok(password, row["password_hash"]):
            return _json_response({"message": "Nieprawidłowy login lub hasło."}, 401)

        token = secrets.token_urlsafe(48)
        now = int(time.time())
        conn.execute("DELETE FROM sessions WHERE expires_at <= ?", (now,))
        conn.execute(
            """
            INSERT INTO sessions(token_hash, user_id, expires_at, created_at)
            VALUES (?, ?, ?, ?)
            """,
            (_token_hash(token), row["id"], now + SESSION_TTL, now),
        )
        conn.commit()

    forwarded_proto = request.headers.get("X-Forwarded-Proto", "")
    secure = forwarded_proto.lower() == "https"
    response.set_cookie(
        SESSION_COOKIE,
        token,
        path="/",
        httponly=True,
        secure=secure,
        samesite="lax",
        max_age=SESSION_TTL,
    )
    return {
        "user": {
            "id": row["id"],
            "username": row["username"],
            "role": row["role"],
            "active": row["active"],
        }
    }


@post("/api/auth/logout")
def auth_logout():
    token = request.get_cookie(SESSION_COOKIE)
    if token:
        with _db() as conn:
            conn.execute("DELETE FROM sessions WHERE token_hash = ?", (_token_hash(token),))
            conn.commit()
    response.delete_cookie(SESSION_COOKIE, path="/")
    return {"ok": True}


@post("/api/auth/change-password")
def auth_change_password():
    user = _require_user()
    payload = request.json or {}
    current_password = str(payload.get("current_password", ""))
    new_password = str(payload.get("new_password", ""))

    if len(new_password) < 6:
        return _json_response({"message": "Nowe hasło musi mieć minimum 6 znaków."}, 400)

    with _db() as conn:
        row = conn.execute(
            "SELECT password_hash FROM users WHERE id = ?", (user["id"],)
        ).fetchone()
        if not row or not _password_ok(current_password, row["password_hash"]):
            return _json_response({"message": "Aktualne hasło jest nieprawidłowe."}, 400)

        conn.execute(
            "UPDATE users SET password_hash = ?, updated_at = ? WHERE id = ?",
            (_password_hash(new_password), int(time.time()), user["id"]),
        )
        conn.execute("DELETE FROM sessions WHERE user_id = ? AND token_hash != ?", (
            user["id"],
            _token_hash(request.get_cookie(SESSION_COOKIE)),
        ))
        conn.commit()

    return {"ok": True}


@get("/api/admin/users")
def admin_users():
    _require_admin()
    with _db() as conn:
        rows = conn.execute(
            """
            SELECT id, username, role, active, created_at
            FROM users
            ORDER BY role = 'admin' DESC, username COLLATE NOCASE
            """
        ).fetchall()
    return _json_response({"users": [dict(row) for row in rows]})


@post("/api/admin/users")
def admin_create_user():
    _require_admin()
    payload = request.json or {}
    username = str(payload.get("username", "")).strip()
    password = str(payload.get("password", ""))

    if len(username) < 3:
        return _json_response({"message": "Login musi mieć minimum 3 znaki."}, 400)
    if len(password) < 6:
        return _json_response({"message": "Hasło musi mieć minimum 6 znaków."}, 400)
    if not re.fullmatch(r"[A-Za-z0-9._-]+", username):
        return _json_response({"message": "Login może zawierać litery, cyfry, kropkę, _ i -."}, 400)

    now = int(time.time())
    try:
        with _db() as conn:
            cur = conn.execute(
                """
                INSERT INTO users(username, password_hash, role, active, created_at, updated_at)
                VALUES (?, ?, 'user', 1, ?, ?)
                """,
                (username, _password_hash(password), now, now),
            )
            conn.commit()
            user_id = cur.lastrowid
    except sqlite3.IntegrityError:
        return _json_response({"message": "Użytkownik o takim loginie już istnieje."}, 409)

    return _json_response(
        {"user": {"id": user_id, "username": username, "role": "user", "active": 1}},
        201,
    )


@post("/api/admin/users/<user_id:int>/password")
def admin_reset_password(user_id):
    admin = _require_admin()
    payload = request.json or {}
    password = str(payload.get("password", ""))
    if len(password) < 6:
        return _json_response({"message": "Hasło musi mieć minimum 6 znaków."}, 400)

    with _db() as conn:
        row = conn.execute("SELECT role FROM users WHERE id = ?", (user_id,)).fetchone()
        if not row:
            return _json_response({"message": "Nie znaleziono użytkownika."}, 404)
        if row["role"] == "admin" and user_id != admin["id"]:
            return _json_response({"message": "Nie można zmienić hasła innego administratora."}, 403)
        conn.execute(
            "UPDATE users SET password_hash = ?, updated_at = ? WHERE id = ?",
            (_password_hash(password), int(time.time()), user_id),
        )
        conn.execute("DELETE FROM sessions WHERE user_id = ?", (user_id,))
        conn.commit()
    return {"ok": True}


def _decode_list(value):
    try:
        data = json.loads(value or "[]")
        return data if isinstance(data, list) else []
    except Exception:
        return []


def _item_key(item):
    if isinstance(item, dict):
        return str(item.get("value") or item.get("name") or json.dumps(item, sort_keys=True))
    return str(item)


def _merge_lists(old, new):
    merged = []
    seen = set()
    for item in list(old or []) + list(new or []):
        key = _item_key(item).strip().lower()
        if not key or key in seen:
            continue
        seen.add(key)
        merged.append(item)
    return merged


def _upsert_contact(conn, user_id, task_id, record):
    domain = str(record.get("domain") or "").strip().lower()
    if not domain:
        return False

    now = int(time.time())
    fields = [
        "emails", "phones", "linkedins", "twitters", "instagrams",
        "facebooks", "youtubes", "githubs", "technologies",
    ]
    existing = conn.execute(
        "SELECT * FROM contacts WHERE user_id = ? AND domain = ?",
        (user_id, domain),
    ).fetchone()

    values = {}
    for field in fields:
        current = _decode_list(existing[field]) if existing else []
        incoming = record.get(field) or []
        values[field] = _merge_lists(current, incoming)

    payload = (
        str(record.get("title") or (existing["title"] if existing else "") or ""),
        *[json.dumps(values[field], ensure_ascii=False) for field in fields],
        json.dumps(record, ensure_ascii=False),
        task_id,
        now,
    )

    if existing:
        conn.execute(
            """
            UPDATE contacts SET
                title = ?, emails = ?, phones = ?, linkedins = ?, twitters = ?,
                instagrams = ?, facebooks = ?, youtubes = ?, githubs = ?,
                technologies = ?, raw_json = ?, last_task_id = ?, updated_at = ?
            WHERE id = ?
            """,
            payload + (existing["id"],),
        )
    else:
        conn.execute(
            """
            INSERT INTO contacts(
                user_id, domain, title, emails, phones, linkedins, twitters,
                instagrams, facebooks, youtubes, githubs, technologies,
                raw_json, last_task_id, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                user_id,
                domain,
                payload[0],
                *payload[1:10],
                payload[10],
                payload[11],
                now,
                now,
            ),
        )
    return True


def _sync_task_for_user(user_id, task_id):
    from botasaurus_server.db_setup import Session
    from botasaurus_server.models import Task, TaskStatus
    from botasaurus_server.task_results import TaskResults

    with _db() as conn:
        already = conn.execute(
            "SELECT 1 FROM synced_tasks WHERE user_id = ? AND task_id = ?",
            (user_id, task_id),
        ).fetchone()
    if already:
        return 0

    with Session() as session:
        task = session.query(Task).filter(Task.id == int(task_id)).first()
        if not task or task.status != TaskStatus.COMPLETED:
            return 0
        metadata = task.meta_data or {}
        if int(metadata.get("kf_user_id", -1)) != int(user_id):
            return 0
        results = (
            TaskResults.get_all_task(task.id)
            if task.is_all_task
            else TaskResults.get_task(task.id)
        )

    if not isinstance(results, list):
        return 0

    saved = 0
    with _db() as conn:
        for record in results:
            if isinstance(record, dict) and _upsert_contact(conn, user_id, task_id, record):
                saved += 1
        conn.execute(
            "INSERT OR REPLACE INTO synced_tasks(user_id, task_id, synced_at) VALUES (?, ?, ?)",
            (user_id, task_id, int(time.time())),
        )
        conn.commit()
    return saved


def _sync_all_for_user(user_id):
    from botasaurus_server.db_setup import Session
    from botasaurus_server.models import Task, TaskStatus

    with Session() as session:
        tasks = session.query(Task.id, Task.meta_data).filter(
            Task.status == TaskStatus.COMPLETED,
            Task.is_all_task == True,
        ).all()

    saved = 0
    for task_id, metadata in tasks:
        metadata = metadata or {}
        if int(metadata.get("kf_user_id", -1)) == int(user_id):
            saved += _sync_task_for_user(user_id, task_id)
    return saved


@post("/api/database/sync/<task_id:int>")
def database_sync(task_id):
    user = _require_user()
    if not _task_belongs_to_user(task_id, user["id"]):
        return _json_response({"message": "Nie znaleziono zadania."}, 404)

    saved = _sync_task_for_user(user["id"], task_id)
    return {"ok": True, "saved": saved}


@get("/api/database")
def database_list():
    user = _require_user()
    _sync_all_for_user(user["id"])
    query = str(request.query.get("q") or "").strip().lower()
    params = [user["id"]]
    sql = "SELECT * FROM contacts WHERE user_id = ?"
    if query:
        sql += " AND (lower(domain) LIKE ? OR lower(COALESCE(title, '')) LIKE ? OR lower(emails) LIKE ? OR lower(phones) LIKE ?)"
        wildcard = "%" + query + "%"
        params.extend([wildcard, wildcard, wildcard, wildcard])
    sql += " ORDER BY updated_at DESC, domain ASC LIMIT 5000"

    with _db() as conn:
        rows = conn.execute(sql, params).fetchall()

    result = []
    for row in rows:
        item = dict(row)
        for field in (
            "emails", "phones", "linkedins", "twitters", "instagrams",
            "facebooks", "youtubes", "githubs", "technologies",
        ):
            item[field] = _decode_list(item[field])
        item.pop("raw_json", None)
        result.append(item)

    return _json_response({"count": len(result), "results": result})


# Tag every newly created Botasaurus task with the authenticated user.
import botasaurus_server.routes_db_logic as _routes_logic

_original_validate_task_request = _routes_logic.validate_task_request


def _validate_task_request_for_user(json_data):
    scraper_name, data, metadata = _original_validate_task_request(json_data)
    user = _require_user()
    metadata = dict(metadata or {})
    metadata["kf_user_id"] = int(user["id"])
    return scraper_name, data, metadata


_routes_logic.validate_task_request = _validate_task_request_for_user


# Filter task listings by the current authenticated user.
_original_query_tasks = _routes_logic.queryTasks


def _query_tasks_for_user(ets, with_results, page=None, per_page=None, serializer=None):
    user = _current_user()
    if not user:
        if serializer is None:
            return _original_query_tasks(ets, with_results, page, per_page)
        return _original_query_tasks(ets, with_results, page, per_page, serializer)

    from botasaurus_server.db_setup import Session
    from botasaurus_server.models import Task, serialize_task

    if serializer is None:
        serializer = serialize_task

    with Session() as session:
        all_tasks = session.query(Task).order_by(Task.sort_id.desc()).all()
        user_tasks = [
            task for task in all_tasks
            if int((task.meta_data or {}).get("kf_user_id", -1)) == int(user["id"])
        ]

        total_count = len(user_tasks)

        if per_page is None:
            per_page = 1 if total_count == 0 else total_count
            page = 1
        else:
            per_page = int(per_page)

        total_pages = max((total_count + per_page - 1) // per_page, 1)
        page = max(min(int(page), total_pages), 1)
        start = (page - 1) * per_page
        tasks = user_tasks[start:start + per_page]

        next_page = page + 1 if (page * per_page) < total_count else None
        previous_page = page - 1 if page > 1 else None

        if next_page:
            next_page = _routes_logic.create_page_url(next_page, per_page, with_results)
        if previous_page:
            previous_page = _routes_logic.create_page_url(previous_page, per_page, with_results)

        return {
            "count": total_count,
            "total_pages": total_pages,
            "next": next_page,
            "previous": previous_page,
            "results": [serializer(task, with_results) for task in tasks],
        }


_routes_logic.queryTasks = _query_tasks_for_user

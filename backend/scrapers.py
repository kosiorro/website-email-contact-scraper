from botasaurus_server.server import Server
from botasaurus_server.ui import CustomField, ExpandListField, Field, View, filters, sorts

from src.contact_scraper import scrape_contacts

Server.configure(
    title="KontaktFinder",
    header_title="KontaktFinder",
    description="Znajdź publicznie dostępne adresy e-mail, numery telefonów, profile społecznościowe i technologie używane przez dowolną stronę.",
    right_header={
        "text": "Wyszukiwarka kontaktów",
        "link": None,
    },
)

CRAWL_MODES = ("homepage", "key_pages", "deep")
DEFAULT_MODE = "key_pages"


def _split_task(data):
    mode = (data.get("mode") or DEFAULT_MODE).strip().lower()
    if mode not in CRAWL_MODES:
        mode = DEFAULT_MODE
    return [
        {"query": website.strip(), "mode": mode}
        for website in data["websites"]
        if website and website.strip()
    ]


def _join_values(key):
    def map_values(record):
        return ", ".join(item["value"] for item in record.get(key) or [])

    return map_values


def _join_names(record):
    return ", ".join(tech["name"] for tech in record.get("technologies") or [])


overview_view = View(
    "Podsumowanie",
    [
        Field("domain"),
        Field("title"),
        CustomField("emails", map=_join_values("emails")),
        CustomField("phones", map=_join_values("phones")),
        CustomField("linkedins", map=_join_values("linkedins")),
        CustomField("twitters", map=_join_values("twitters")),
        CustomField("instagrams", map=_join_values("instagrams")),
        CustomField("facebooks", map=_join_values("facebooks")),
        CustomField("youtubes", map=_join_values("youtubes")),
        CustomField("githubs", map=_join_values("githubs")),
        CustomField("technologies", map=_join_names),
        Field("error"),
    ],
)

email_list_view = View(
    "Adresy e-mail",
    [
        Field("domain"),
        ExpandListField(
            "emails",
            [
                Field("value", output_key="email"),
                Field("is_likely_official"),
                CustomField("sources", map=lambda item, record: ", ".join(item["sources"])),
            ],
        ),
    ],
)

Server.add_scraper(
    scrape_contacts,
    display_name="Wyszukiwarka kontaktów",
    get_task_name=lambda item: item["query"],
    create_all_task=True,
    split_task=_split_task,
    filters=[
        filters.SearchTextInput("domain"),
        filters.IsTruthyCheckbox("emails", label="Posiada e-mail"),
        filters.IsTruthyCheckbox("phones", label="Posiada telefon"),
        filters.IsTruthyCheckbox("linkedins", label="Posiada LinkedIn"),
        filters.IsNotNullCheckbox("error", label="Zawiera błąd"),
    ],
    sorts=[
        sorts.AlphabeticAscendingSort("domain"),
    ],
    views=[overview_view, email_list_view],
)

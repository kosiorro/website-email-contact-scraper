import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { AuthApi } from '../../utils/auth-api'
import { Link } from '../Link'

export default function Header() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    AuthApi.me().then(({ data }) => setUser(data.user)).catch(() => {})
  }, [])

  const logout = async () => {
    await AuthApi.logout()
    router.replace('/login')
  }

  return (
    <header className="mk-header">
      <div className="mk-header-inner">
        <Link href="/" passHref>
          <a className="mk-logo">
            <strong>mk<span>✱</span></strong>
            <em>kontakt finder</em>
          </a>
        </Link>

        <nav className="mk-nav">
          <Link href="/" passHref><a>Skanowanie</a></Link>
          <Link href="/tasks" passHref><a>Zadania</a></Link>
          <Link href="/database" passHref><a>Baza kontaktów</a></Link>
          <Link href="/settings" passHref><a>Ustawienia</a></Link>
          {user ? <button onClick={logout}>{user.username} · Wyloguj ↗</button> : null}
        </nav>
      </div>
    </header>
  )
}

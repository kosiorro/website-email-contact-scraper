import { useState } from 'react'
import { useRouter } from 'next/router'
import Seo from '../components/Seo'
import { AuthApi } from '../utils/auth-api'

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('admin')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await AuthApi.login(username, password)
      router.replace('/')
    } catch (e) {
      setError(e?.response?.data?.message || 'Nie udało się zalogować.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Seo title="Logowanie — KontaktFinder" />
      <main className="auth-page">
        <div className="auth-brand">
          <div className="mk-brand"><strong>mk<span>✱</span></strong> <em>kontakt finder</em></div>
          <div className="auth-kicker"><i /> PANEL DOSTĘPU</div>
          <h1>Znajdź kontakt.<br/><span>Zacznij rozmowę.</span></h1>
          <p>
            Wyszukuj publiczne dane kontaktowe firm, porządkuj wyniki
            i buduj własną bazę kontaktów z kolejnych skanów.
          </p>
        </div>

        <form className="auth-card" onSubmit={submit}>
          <div className="auth-card-top">
            <span>LOGOWANIE</span>
            <small>KontaktFinder</small>
          </div>
          <label>Login</label>
          <input value={username} onChange={e => setUsername(e.target.value)} autoFocus />
          <label>Hasło</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          {error ? <div className="form-error">{error}</div> : null}
          <button className="mk-button" type="submit" disabled={loading}>
            {loading ? 'Logowanie...' : 'Zaloguj się'} <span>↗</span>
          </button>
          <p className="auth-hint">Pierwsze logowanie: <b>admin / admin</b>. Po zalogowaniu zmień hasło w Ustawieniach.</p>
        </form>
      </main>
    </>
  )
}

import { useEffect, useState } from 'react'
import AuthedDashboard from '../components/AuthedDashboard'
import Seo from '../components/Seo'
import { Container } from '../components/Wrappers'
import { AuthApi } from '../utils/auth-api'

export default function SettingsPage() {
  const [me, setMe] = useState<any>(null)
  const [users, setUsers] = useState<any[]>([])
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newUser, setNewUser] = useState('')
  const [newUserPassword, setNewUserPassword] = useState('')
  const [message, setMessage] = useState('')

  const load = async () => {
    const { data } = await AuthApi.me()
    setMe(data.user)
    if (data.user.role === 'admin') {
      const usersResponse = await AuthApi.users()
      setUsers(usersResponse.data.users)
    }
  }

  useEffect(() => { load() }, [])

  const changePassword = async (e) => {
    e.preventDefault()
    setMessage('')
    await AuthApi.changePassword(currentPassword, newPassword)
    setCurrentPassword('')
    setNewPassword('')
    setMessage('Hasło zostało zmienione.')
  }

  const createUser = async (e) => {
    e.preventDefault()
    setMessage('')
    await AuthApi.createUser(newUser, newUserPassword)
    setNewUser('')
    setNewUserPassword('')
    setMessage('Użytkownik został utworzony.')
    await load()
  }

  const resetPassword = async (id) => {
    const password = window.prompt('Podaj nowe hasło (min. 6 znaków):')
    if (!password) return
    await AuthApi.resetUserPassword(id, password)
    setMessage('Hasło użytkownika zostało zmienione.')
  }

  return (
    <>
      <Seo title="Ustawienia — KontaktFinder" />
      <AuthedDashboard>
        <Container>
          <section className="page-intro">
            <div className="auth-kicker"><i /> KONTO I DOSTĘP</div>
            <h1>Ustawienia</h1>
            <p>Zarządzaj hasłem i — jako administrator — kontami użytkowników.</p>
          </section>

          {message ? <div className="success-message">{message}</div> : null}

          <div className="settings-grid">
            <form className="editorial-card" onSubmit={changePassword}>
              <span className="eyebrow">Twoje konto</span>
              <h2>Zmień hasło</h2>
              <label>Aktualne hasło</label>
              <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required />
              <label>Nowe hasło</label>
              <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} minLength={6} required />
              <button className="mk-button" type="submit">Zapisz nowe hasło <span>↗</span></button>
            </form>

            {me?.role === 'admin' ? (
              <form className="editorial-card" onSubmit={createUser}>
                <span className="eyebrow">Administrator</span>
                <h2>Dodaj użytkownika</h2>
                <label>Login</label>
                <input value={newUser} onChange={e => setNewUser(e.target.value)} required />
                <label>Hasło startowe</label>
                <input type="password" value={newUserPassword} onChange={e => setNewUserPassword(e.target.value)} minLength={6} required />
                <button className="mk-button" type="submit">Utwórz użytkownika <span>↗</span></button>
              </form>
            ) : null}
          </div>

          {me?.role === 'admin' ? (
            <section className="editorial-card users-card">
              <div className="card-heading">
                <div><span className="eyebrow">Administrator</span><h2>Użytkownicy</h2></div>
                <span>{users.length} kont</span>
              </div>
              <div className="users-table">
                {users.map(user => (
                  <div className="user-row" key={user.id}>
                    <div>
                      <b>{user.username}</b>
                      <span>{user.role === 'admin' ? 'Administrator' : 'Użytkownik'}</span>
                    </div>
                    <button className="text-action" onClick={() => resetPassword(user.id)}>Zmień hasło ↗</button>
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </Container>
      </AuthedDashboard>
    </>
  )
}

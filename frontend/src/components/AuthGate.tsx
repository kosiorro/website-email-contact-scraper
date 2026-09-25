import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { AuthApi } from '../utils/auth-api'

export default function AuthGate({ children }) {
  const router = useRouter()
  const [state, setState] = useState({ loading: true, user: null })

  useEffect(() => {
    if (router.pathname === '/login') {
      setState({ loading: false, user: null })
      return
    }
    AuthApi.me()
      .then(({ data }) => setState({ loading: false, user: data.user }))
      .catch(() => router.replace('/login'))
  }, [router.pathname])

  if (router.pathname === '/login') return children
  if (state.loading || !state.user) {
    return <div className="auth-loading">Ładowanie panelu...</div>
  }
  return children
}

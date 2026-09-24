import { useEffect, useState } from 'react'
import AuthedDashboard from '../components/AuthedDashboard'
import Seo from '../components/Seo'
import { Container } from '../components/Wrappers'
import { AuthApi } from '../utils/auth-api'

function values(list) {
  return (list || []).map(item => typeof item === 'object' ? (item.value || item.name || '') : item).filter(Boolean)
}

export default function DatabasePage() {
  const [q, setQ] = useState('')
  const [data, setData] = useState<any>({ count: 0, results: [] })

  const load = async (query = '') => {
    const response = await AuthApi.database(query)
    setData(response.data)
  }

  useEffect(() => { load() }, [])

  return (
    <>
      <Seo title="Baza kontaktów — KontaktFinder" />
      <AuthedDashboard>
        <Container>
          <section className="page-intro database-intro">
            <div>
              <div className="auth-kicker"><i /> TWOJA BAZA</div>
              <h1>Baza kontaktów</h1>
              <p>Łączne dane znalezione we wszystkich Twoich zakończonych skanach.</p>
            </div>
            <div className="database-count"><b>{data.count}</b><span>firm</span></div>
          </section>

          <div className="database-search">
            <input
              placeholder="Szukaj po domenie, e-mailu, telefonie..."
              value={q}
              onChange={e => {
                setQ(e.target.value)
                load(e.target.value)
              }}
            />
          </div>

          <div className="contacts-list">
            {data.results.map(row => (
              <article className="contact-row" key={row.id}>
                <div className="contact-domain">
                  <span className="domain-dot" />
                  <div><b>{row.domain}</b><small>{row.title || '—'}</small></div>
                </div>
                <div className="contact-column"><span>E-MAIL</span>{values(row.emails).slice(0,3).map(x => <a href={'mailto:' + x} key={x}>{x}</a>)}</div>
                <div className="contact-column"><span>TELEFON</span>{values(row.phones).slice(0,3).map(x => <b key={x}>{x}</b>)}</div>
                <div className="contact-column"><span>TECHNOLOGIE</span><p>{values(row.technologies).slice(0,5).join(' · ') || '—'}</p></div>
              </article>
            ))}
            {!data.results.length ? <div className="empty-editorial">Brak kontaktów w bazie. Uruchom pierwsze skanowanie.</div> : null}
          </div>
        </Container>
      </AuthedDashboard>
    </>
  )
}

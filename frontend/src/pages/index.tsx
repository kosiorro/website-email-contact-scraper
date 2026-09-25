import AuthedDashboard from '../components/AuthedDashboard'
import InputComponent from '../components/InputComponent/InputComponent'
import { Link } from '../components/Link'
import Seo from '../components/Seo'
import { Container } from '../components/Wrappers'
import { homeServerSideProps } from '../utils/props'

const Page = ({ ...props }: any) => {
  return (
    <>
      <Seo
        {...props}
        title="KontaktFinder — wyszukiwarka danych kontaktowych"
        description="Znajdź publicznie dostępne dane kontaktowe firm i buduj własną bazę kontaktów."
      />
      <AuthedDashboard {...props}>
        <Container>
          <section className="mk-hero">
            <div className="mk-hero-copy">
              <div className="auth-kicker"><i /> OD STRONY DO KONTAKTU</div>
              <h1>Znajdź kontakt do firmy.<br/><span>Bez ręcznego szukania.</span></h1>
              <p>
                Skanuj strony internetowe, zbieraj publiczne adresy e-mail,
                telefony, profile społecznościowe i technologie. Każdy wynik
                trafia do Twojej własnej bazy kontaktów.
              </p>
            </div>
            <div className="mk-hero-visual" aria-hidden="true">
              <div className="orbit orbit-a">EMAIL</div>
              <div className="orbit orbit-b">TEL</div>
              <div className="orbit orbit-c">LINKEDIN</div>
              <div className="orbit orbit-d">TECH</div>
            </div>
          </section>

          <section className="scan-panel">
            <div className="scan-panel-heading">
              <div>
                <span className="eyebrow">NOWE SKANOWANIE</span>
                <h2>Jakie strony mam sprawdzić?</h2>
              </div>
              <Link href="/database" passHref>
                <a className="text-action">Przejdź do bazy kontaktów ↗</a>
              </Link>
            </div>
            <InputComponent {...props} />
          </section>
        </Container>
      </AuthedDashboard>
    </>
  )
}

export const getServerSideProps = homeServerSideProps
export default Page

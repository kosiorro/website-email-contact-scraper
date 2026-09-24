import AuthedDashboard from '../components/AuthedDashboard'
import InputComponent from '../components/InputComponent/InputComponent'
import Tabs, { TabsId } from '../components/PagesTabs/PagesTabs'
import Seo from '../components/Seo'
import { Container, TabWrapper } from '../components/Wrappers'
import { homeServerSideProps } from '../utils/props'

const Page = ({ ...props }: any) => {
  return (
    <>
      <Seo
        {...props}
        title="KontaktFinder — wyszukiwarka danych kontaktowych"
        description="Znajdź publicznie dostępne e-maile, telefony, profile społecznościowe i technologie używane przez strony internetowe."
      />
      <AuthedDashboard {...props}>
        <Container>
          <section className="hero-panel">
            <div className="hero-badge">Wyszukiwarka kontaktów B2B</div>
            <h1>Znajdź dane kontaktowe firmy w kilka chwil</h1>
            <p>
              Przeskanuj jedną lub wiele stron i zbierz w jednym miejscu
              adresy e-mail, numery telefonów, profile społecznościowe oraz
              wykryte technologie.
            </p>
            <div className="hero-features">
              <span>✉ E-maile</span>
              <span>☎ Telefony</span>
              <span>in LinkedIn</span>
              <span>◎ Social media</span>
              <span>⚙ Technologie</span>
            </div>
          </section>

          <section className="workspace-card">
            <Tabs initialSelectedTab={TabsId.INPUT} />
            <TabWrapper>
              <div className="section-heading">
                <div>
                  <span className="eyebrow">Nowe skanowanie</span>
                  <h2>Podaj strony, które chcesz sprawdzić</h2>
                </div>
                <div className="privacy-note">Dane publicznie dostępne</div>
              </div>
              <InputComponent {...props} />
            </TabWrapper>
          </section>

          <section className="info-grid">
            <div className="info-card">
              <strong>1. Dodaj domeny</strong>
              <span>Możesz wkleić jedną lub wiele stron do jednego skanowania.</span>
            </div>
            <div className="info-card">
              <strong>2. Wybierz zakres</strong>
              <span>Szybkie sprawdzenie lub dokładne przejście po podstronach.</span>
            </div>
            <div className="info-card">
              <strong>3. Odbierz wyniki</strong>
              <span>Kontakty i technologie otrzymasz w czytelnym zestawieniu.</span>
            </div>
          </section>
        </Container>
      </AuthedDashboard>
    </>
  )
}

export const getServerSideProps = homeServerSideProps
export default Page

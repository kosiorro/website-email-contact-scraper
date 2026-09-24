import { EuiButton, EuiCodeBlock, EuiDescriptionListDescription, EuiEmptyPrompt, EuiImage, EuiLink } from '@elastic/eui';

import CenteredSpinner from '../CenteredSpinner';
import { Link } from '../Link';

function OutputLink() {
  return <Link href="/tasks" passHref>
    <EuiLink>Zobacz wszystkie zadania</EuiLink>
  </Link>
}

export const EmptyInputs = () => (
  <div style={{ padding: '64px 0', textAlign: 'center' }}>
    <EuiEmptyPrompt
      body={<p>Ten scraper nie ma jeszcze skonfigurowanych pól wejściowych.</p>}
      color="subdued"
      layout="vertical"
      title={<h2>Brak pól formularza</h2>}
      titleSize="m"
    />
  </div>
)

export const EmptyScraper = () => (
  <div style={{ padding: '64px 0', textAlign: 'center' }}>
    <EuiEmptyPrompt
      body={<p>Nie znaleziono aktywnego scrapera.</p>}
      color="subdued"
      layout="vertical"
      title={<h2>Brak scrapera</h2>}
      titleSize="m"
    />
  </div>
)

export const EmptyOutputs = () => (
  <div style={{ padding: '64px 0', textAlign: 'center' }}>
    <EuiEmptyPrompt
      body={<p>Uruchom pierwsze skanowanie, aby zobaczyć tutaj wyniki.</p>}
      color="subdued"
      layout="vertical"
      title={<h2>Brak wyników</h2>}
      titleSize="m"
    />
  </div>
)

export const EmptyResults = () => (
  <div style={{ padding: '64px 0', textAlign: 'center' }}>
    <EuiEmptyPrompt
      body={
        <>
          <EuiDescriptionListDescription>
            Spróbuj ponownie z inną domeną lub szerszym zakresem skanowania.
          </EuiDescriptionListDescription>
          <Link href="/" passHref>
            <EuiButton className="mt-4" fill>Nowe skanowanie</EuiButton>
          </Link>
        </>
      }
      color="subdued"
      layout="vertical"
      title={<h2>Nie znaleziono danych</h2>}
      titleSize="m"
    />
  </div>
)

export const EmptyFilterResults = () => (
  <div style={{ padding: '64px 0', textAlign: 'center' }}>
    <EuiEmptyPrompt
      className="filter-prompt"
      body={<EuiDescriptionListDescription>Zmień ustawienia filtrów.</EuiDescriptionListDescription>}
      color="subdued"
      layout="vertical"
      title={<h2>Brak pasujących wyników</h2>}
      titleSize="m"
    />
  </div>
)

export const EmptyPending = () => (
  <div className="space-y-8" style={{ padding: '64px 0', textAlign: 'center' }}>
    <OutputLink />
    <EuiEmptyPrompt
      body={<p>Zadanie oczekuje na rozpoczęcie.</p>}
      color="subdued"
      layout="vertical"
      title={<h2>Oczekuje</h2>}
      titleSize="m"
    />
  </div>
)

export const EmptyInProgress = () => (
  <div className="space-y-8" style={{ padding: '64px 0', textAlign: 'center' }}>
    <OutputLink />
    <EuiEmptyPrompt
      body={<div><p>Skanowanie jest w toku.</p><CenteredSpinner /></div>}
      color="subdued"
      layout="vertical"
      title={<h2>Skanowanie...</h2>}
      titleSize="m"
    />
  </div>
)

export const EmptyFailed = ({ error }) => (
  <div className="space-y-8" style={{ padding: '64px 0', textAlign: 'center' }}>
    <OutputLink />
    <EuiEmptyPrompt
      body={error ? (
        <div>
          <div className="mb-2">Zadanie zakończyło się błędem:</div>
          <EuiCodeBlock
            style={{ textAlign: 'left', backgroundColor: '#F1F4FA' }}
            transparentBackground
            paddingSize="none"
            language="python"
            isCopyable>
            {error}
          </EuiCodeBlock>
        </div>
      ) : <p>Zadanie zakończyło się błędem.</p>}
      color="subdued"
      layout="vertical"
      title={<h2>Błąd</h2>}
      titleSize="m"
    />
  </div>
)

export const EmptyFailedInputJs = ({ error }) => (
  <div className="space-y-8" style={{ padding: '20px 0', textAlign: 'center' }}>
    <EuiEmptyPrompt
      body={error ? (
        <div>
          <div className="mb-2">Nieprawidłowa konfiguracja formularza wejściowego.</div>
          <EuiCodeBlock
            style={{ textAlign: 'left', backgroundColor: '#F1F4FA' }}
            transparentBackground
            paddingSize="none"
            language="python"
            isCopyable>
            {error}
          </EuiCodeBlock>
        </div>
      ) : <p>Nieprawidłowa konfiguracja formularza wejściowego.</p>}
      color="subdued"
      layout="vertical"
      titleSize="m"
    />
  </div>
)

export const EmptyAborted = () => (
  <div className="space-y-8" style={{ padding: '64px 0', textAlign: 'center' }}>
    <OutputLink />
    <EuiEmptyPrompt
      body={<p>Zadanie zostało przerwane.</p>}
      color="subdued"
      layout="vertical"
      title={<h2>Przerwano</h2>}
      titleSize="m"
    />
  </div>
)

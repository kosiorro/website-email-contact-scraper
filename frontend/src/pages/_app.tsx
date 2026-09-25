import 'regenerator-runtime/runtime';

import { EuiErrorBoundary } from '@elastic/eui';
import { Global } from '@emotion/react';
import Head from 'next/head';

import AuthGate from '../components/AuthGate';
import Chrome from '../components/chrome';
import { Theme } from '../components/theme';
import { globalStyles } from '../styles/global.styles';

const EuiApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <></>
      </Head>
      <Global styles={globalStyles} />
      <Theme>
        <Chrome>
          <EuiErrorBoundary>
            <AuthGate>
              <Component {...pageProps} />
            </AuthGate>
          </EuiErrorBoundary>
        </Chrome>
      </Theme>
    </>
  )
}

export default EuiApp

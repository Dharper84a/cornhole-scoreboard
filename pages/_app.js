import '../styles/globals.css'

import { SiteProvider } from '../include/context'

function MyApp({ Component, pageProps }) {
  return (<SiteProvider>
  <Component {...pageProps} />
  </SiteProvider>)
}

export default MyApp

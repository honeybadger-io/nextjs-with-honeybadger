import Honeybadger from '@honeybadger-io/js'

// https://docs.honeybadger.io/lib/javascript/reference/configuration.html
Honeybadger.configure({
  apiKey: process.env.HONEYBADGER_API_KEY,
  revision: process.env.HONEYBADGER_REVISION,
  environment: process.env.NODE_ENV,
  // TODO: DIFFERENT FOR SERVER-SIDE?
  projectRoot: 'webpack://_N_E/./',

  // Uncomment to report errors in development:
  // reportData: true,
})

// This is handy for testing; remove it in production.
if (typeof window !== 'undefined') {
  window.Honeybadger = Honeybadger
}

export default function MyApp({ Component, pageProps, err }) {
  // Uncomment the workaround below if using Next.js version prior to 12.2.1
  // getInitialProps is not called in case of https://github.com/zeit/next.js/issues/8592
  //
  // pageProps.err = err
  return <Component {...pageProps} />
}
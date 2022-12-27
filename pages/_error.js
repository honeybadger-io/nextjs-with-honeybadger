import Error from 'next/error'
import Honeybadger from '@honeybadger-io/js'

const MyError = ({ statusCode, hasGetInitialPropsRun, err }) => {
  // Uncomment the workaround below if using Next.js version prior to 12.2.1
  // getInitialProps is not called in case of https://github.com/zeit/next.js/issues/8592
  //
  // if (!hasGetInitialPropsRun && err) {
  //   Honeybadger.notify(err)
  // }
  return <Error statusCode={statusCode} />
}

MyError.getInitialProps = async ({ res, err, asPath }) => {
  const errorInitialProps = await Error.getInitialProps({ res, err })

  // Uncomment the workaround below if using Next.js version prior to 12.2.1
  // getInitialProps is not called in case of https://github.com/zeit/next.js/issues/8592
  //
  // errorInitialProps.hasGetInitialPropsRun = true

  if (res) {
    // Running on the server, the response object is available.
    //
    // Next.js will pass an err on the server if a page's `getInitialProps`
    // threw or returned a Promise that rejected

    if (res.statusCode === 404) {
      // Opinionated: do not record an exception in Honeybadger for 404
      return { statusCode: 404 }
    }

    if (err) {
      Honeybadger.notify(err)

      return errorInitialProps
    }
  } else {
    // Running on the client (browser).
    //
    // Next.js will provide an err if:
    //
    //  - a page's `getInitialProps` threw or returned a Promise that rejected
    //  - an exception was thrown somewhere in the React lifecycle (render,
    //    componentDidMount, etc) that was caught by Next.js's React Error
    //    Boundary. Read more about what types of exceptions are caught by Error
    //    Boundaries: https://reactjs.org/docs/error-boundaries.html
    if (err) {
      Honeybadger.notify(err)

      return errorInitialProps
    }
  }

  // If this point is reached, getInitialProps was called without any
  // information about what the error might be. This is unexpected and may
  // indicate a bug introduced in Next.js, so record it in Honeybadger
  Honeybadger.notify(
    new Error(`_error.js getInitialProps missing data at path: ${asPath}`)
  )

  return errorInitialProps
}

export default MyError

import React from 'react'
import App from 'next/app'
import Honeybadger from '@honeybadger-io/js'

// https://docs.honeybadger.io/lib/javascript/reference/configuration.html
const sharedHoneybadgerConfig = {
  apiKey: process.env.HONEYBADGER_API_KEY,
  revision: process.env.HONEYBADGER_REVISION,
  environment: process.env.NODE_ENV,

  // Uncomment to report errors in development:
  reportData: true,
}

if (typeof window === 'undefined') {
  // Node config
  const projectRoot = process.cwd()
  Honeybadger.configure({
    ...sharedHoneybadgerConfig,
    projectRoot: 'webpack:///./',
  }).beforeNotify((notice) => {
    notice.backtrace.forEach((line) => {
      if (line.file) {
        line.file = line.file.replace(`${ projectRoot }/.next/server/`, 'http://localhost:3000/_next/')
      }
      return line
    })
  })
} else {
  // Browser config
  Honeybadger.configure({
    ...sharedHoneybadgerConfig,
    projectRoot: 'webpack://_N_E/./',
  })
}

// This is handy for testing; remove it in production.
if (typeof window !== 'undefined') {
  window.Honeybadger = Honeybadger
}

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props

    // Workaround for https://github.com/zeit/next.js/issues/8592
    const { err } = this.props
    const modifiedPageProps = { ...pageProps, err }

    return <Component {...modifiedPageProps} />
  }
}

export default MyApp

import React from 'react'
import App from 'next/app'
import * as Honeybadger from 'honeybadger'

if (typeof window === 'undefined') {
  // Node
  // https://docs.honeybadger.io/lib/node.html#configuration
  Honeybadger.configure({
    apiKey: process.env.HONEYBADGER_API_KEY,
    developmentEnvironments: ['test', 'development']
  })
} else {
  // Browser
  // https://docs.honeybadger.io/lib/javascript/reference/configuration.html
  Honeybadger.configure({
    apiKey: process.env.HONEYBADGER_API_KEY,
    revision: process.env.HONEYBADGER_REVISION,
    disabled: process.env.NODE_ENV !== 'production'
  })

  // This is handy for testing; remove it in production.
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

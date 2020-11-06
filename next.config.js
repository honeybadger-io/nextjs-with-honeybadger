// Use the hidden-source-map option when you don't want the source maps to be
// publicly available on the servers, only to the error reporting
const withSourceMaps = require('@zeit/next-source-maps')()
const HoneybadgerSourceMapPlugin = require('@honeybadger-io/webpack')
const { execSync } = require('child_process');

// Use the HoneybadgerSourceMapPlugin to upload the source maps during build step
const {
  HONEYBADGER_API_KEY,
  HONEYBADGER_ASSETS_URL,
  NODE_ENV,
} = process.env

const HONEYBADGER_REVISION = execSync('git rev-parse HEAD').toString().trim()

module.exports = withSourceMaps({
  env: {
    HONEYBADGER_API_KEY: HONEYBADGER_API_KEY,
    HONEYBADGER_REVISION: HONEYBADGER_REVISION,
  },
  webpack: (config, options) => {
    // When all the Honeybadger configuration env variables are
    // available/configured The Honeybadger webpack plugin gets pushed to the
    // webpack plugins to build and upload the source maps to Honeybadger.
    // This is an alternative to manually uploading the source maps.
    // See https://docs.honeybadger.io/lib/javascript/guides/using-source-maps.html
    // Note: This is disabled in development mode.
    if (
      HONEYBADGER_API_KEY &&
      HONEYBADGER_ASSETS_URL &&
      NODE_ENV === 'production'
    ) {
      config.plugins.push(
        new HoneybadgerSourceMapPlugin({
          apiKey: HONEYBADGER_API_KEY,
          assetsUrl: HONEYBADGER_ASSETS_URL,
          revision: HONEYBADGER_REVISION,
        })
      )
    }

    return config
  },
})

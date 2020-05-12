[![Deploy To Now](https://deploy.now.sh/static/button.svg)](https://deploy.now.sh/?repo=https://github.com/honeybadger-io/nextjs-with-honeybadger)

# Next.js with Honeybadger Error Reporting

This is a simple example showing how to use
[Honeybadger](https://www.honeybadger.io/) to catch & report errors on both
client + server side. It's based on Vercel's
[with-sentry-simple](https://github.com/zeit/next.js/tree/canary/examples/with-sentry-simple)
example.

## How To Use

### Using `create-next-app`

Execute [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init) or [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) to bootstrap the example:

```bash
npm init next-app --example https://github.com/honeybadger-io/nextjs-with-honeybadger nextjs-with-honeybadger
# or
yarn create next-app --example https://github.com/honeybadger-io/nextjs-with-honeybadger nextjs-with-honeybadger
```

### Download Manually

Download the example:

```bash
mkdir nextjs-with-honeybadger
curl https://codeload.github.com/honeybadger-io/nextjs-with-honeybadger/tar.gz/master | tar -xz --strip-components=1 -C nextjs-with-honeybadger
cd nextjs-with-honeybadger
```

Install it and run:

**NPM**

```bash
npm install
npm run dev
```

**Yarn**

```bash
yarn
yarn dev
```

Deploy it to the cloud with [Vercel](https://vercel.com/import?filter=next.js&utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).

## About Example

This is a simple example showing how to use [Honeybadger](https://www.honeybadger.io/) to catch & report errors on both client + server side.

- `_app.js` renders on both the server and client. It initializes Honeybadger to catch any unhandled exceptions
- `_error.js` is rendered by Next.js while handling certain types of exceptions for you. It is overridden so those exceptions can be passed along to Honeybadger
- `next.config.js` enables source maps in production for Honeybadger and swaps out `honeybadger` (the Node version) for `honeybadger-js` (the browser version) when building the client bundle

**Note**: By default, neither sourcemaps nor error tracking is enabled in development mode (see Configuration).

**Note**: When enabled in development mode, error handling [works differently than in production](https://nextjs.org/docs#custom-error-handling) as `_error.js` is never actually called.

**Note**: The build output will contain warning about unhandled Promise rejections. This caused by the test pages, and is expected.

**Note**: The version of `@zeit/next-source-maps` (`0.0.4-canary.1`) is important and must be specified since it is not yet the default. Otherwise [source maps will not be generated for the server](https://github.com/zeit/next-plugins/issues/377).

**Note**: Both `@zeit/next-source-maps` and `@honeybadger-io/webpack` are added to dependencies (rather than `devDependencies`) is because if used with SSR (ex. heroku), these plugins are used during production for generating the source-maps and sending them to Honeybadger.

### Configuration

#### Error tracking

1. Copy your Honeybadger API key. You can get it from your project settings page in [Honeybadger](https://app.honeybadger.io/).
2. Put the API key inside the `HONEYBADGER_API_KEY` environment variable.

**Note:** Error tracking is disabled in development mode using the `NODE_ENV` environment variable. To change this behaviour, see the `_app.js` file. More details about how `NODE_ENV` is set in next deployments can be found [here](https://nextjs.org/docs#production-deployment).

#### Automatic sourcemap upload (optional)

1. Set up the `HONEYBADGER_API_KEY` environment variable as described above.
1. Set up the `HONEYBADGER_ASSETS_URL` environment variable. See the
   [Honeybadger webpack plugin
   docs](https://github.com/honeybadger-io/honeybadger-webpack#configuration)
   for more info. Note: when testing locally, it's
   `HONEYBADGER_ASSETS_URL=http://localhost:3000/_next`.

**Note:** Sourcemap upload is disabled in development mode using the `NODE_ENV` environment variable. To change this behaviour, remove the `NODE_ENV === 'production'` check from your `next.config.js` file. More details about how `NODE_ENV` is set in next deployments can be found [here](https://nextjs.org/docs#production-deployment).

#### Other configuration options

More configuration is available for the [Honeybadger webpack plugin](https://github.com/honeybadger-io/honeybadger-webpack) and Honeybadger [Node](https://docs.honeybadger.io/lib/node.html) and [Browser](https://docs.honeybadger.io/lib/javascript/index.html) error reporting clients.

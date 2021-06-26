
rm package-lock.json

curl https://gist.githubusercontent.com/hayashiki/3ffc6d8658c68663d2ff7bb91d291f0d/raw/c8c60af82cdccccd4e67e8179d3f4b60a15ac5c8/setup-01-must.sh | sh

rm jest.config

curl https://gist.githubusercontent.com/hayashiki/3ffc6d8658c68663d2ff7bb91d291f0d/raw/c8c60af82cdccccd4e67e8179d3f4b60a15ac5c8/setup-02-material-ui.sh | sh

curl https://gist.githubusercontent.com/hayashiki/3ffc6d8658c68663d2ff7bb91d291f0d/raw/c8c60af82cdccccd4e67e8179d3f4b60a15ac5c8/setup-04-layout.sh | sh

curl https://gist.githubusercontent.com/hayashiki/3ffc6d8658c68663d2ff7bb91d291f0d/raw/dcfc61ae6957497f203916b4c8fab2fcbfbac075/setup-05-applo-client.sh | sh


yarn add -D @storybook/react @storybook/addon-actions @storybook/addon-backgrounds @storybook/addon-docs @storybook/addon-knobs @storybook/addon-links @storybook/addon-storysource @storybook/addon-viewport @storybook/addons

#sh: line 10: getInitialProps: command not found
#sh: line 10: _document: command not found
#sh: line 10: _app: command not found

yarn add nprogress
yarn add -D @types/nprogress

---

yarn add react-google-login

yarn add gapi
yarn add -D @types/gapi @types/gapi.auth2

yarn add nprogress
yarn add -D @types/nprogress

touch next.config.js

```
require('dotenv').config();

module.exports = {
  config: {
    GQL_URI: process.env.GQL_URI,
    GOOGLE_OAUTH_CLIENT_ID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    REVISION_ID: process.env.REVISION_ID,
    VERSION: require('./package.json').version,
  }
}

```

touch src/lib/config.ts
```
import getConfig from 'next/config'

const { config } = getConfig()

export const GQL_URI = config.GQL_URI
export const GOOGLE_OAUTH_CLIENT_ID = config.GOOGLE_OAUTH_CLIENT_ID
export const REVISION_ID = config.REVISION_ID
export const VERSION = config.VERSION

```
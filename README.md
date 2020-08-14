# Breadfish OAuth

A simple library to use the Breadfish OAuth API in NodeJS.

## Table of Contents

-   [Installation](#installation)
-   [Usage](#usage)
-   [Support](#support)
-   [Contributing](#contributing)
-   [License](#license)

## Installation

```sh
npm install breadfish-oauth
```

## Usage

```js
const BreadfishOAuth = require("breadfish-oauth");
```

Or if you want to use it with ES6:

```js
import BreadfishOAuth from "breadfish-oauth/es6";
```

## Example

```js
const BreadfishOAuth = require("breadfish-oauth");
let oauth = new BreadfishOAuth("PROJECT_ID", "API_KEY");
```

### Full example

```js
// Always use try/catch when you use the library!
// Many of the functions can throw an error when you pass something invalid.
try {
    let oauth = new BreadfishOAuth("PROJECT_ID", "API_KEY"); // Creates a new oAuth instance (throws an error if the credentials are invalid)
    // Verifies the credentials. This is not required, but is advised,
    // because the generated Auth URL will not work if the credentials are wrong
    await oauth.checkCredentials();
    // Scopes
    let valid = BreadfishOAuth.isValidScope("test"); // Checks if the specified scope is valid (Returns boolean)
    let availableScopes = BreadfishOAuth.getValidScopes(); // All available scopes in an array of strings
    oauth.setScopes(availableScopes); // Sets an array of strings as the available scopes
    oauth.removeScope(availableScopes[0]); // Removes the specified scope
    oauth.clearScopes(); // Removes all scopes
    oauth.addScope(availableScopes[0]); // Adds a single scope

    // Redirect
    oauth.setRedirectURL("https://example.com"); // Sets the redirect url (has to match the domain in the project settings)

    // Getters (These don't have setters! Use the functions to set them)
    let scopes = oauth.scopes;
    let redirectURL = oauth.redirectURL;

    // Generate the Authentification URL
    let url = oauth.getAuthURL(); // Generates the auth url (Throws an error if the scopes are not set, or there is no redirect url set)
} catch (e) {
    console.error(e);
}
```

## Support

Please [open an issue](https://github.com/leonmrbonnie/breadfish-oauth/issues/new) for support.

## License

MIT © Leon B.

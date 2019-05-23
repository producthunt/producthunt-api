# Welcome to Product Hunt API 2.0 Starter Kit

This is a minimal starter kit that integrates with Product Hunt's API V2 via
OAuth flow.

## Dependencies

* `node` >= `8.15`
* `npm` or `yarn`
* `openssl`

## Setup

1.  Create an OAuth application via [API Dashboard](https://api.producthunt.com/v2/oauth/applications)

2.  `git clone git@github.com:producthunt/producthunt-api.git`

3.  `yarn` or `npm install`

4.  `cp .env.sample .env`.

5.  Update `PH_APP_API_KEY` & `PH_APP_API_SECRET`, `PH_APP_REDIRECT_URI` & `PH_APP_REQUESTED_SCOPES` values in `.env` file.

6.  Only needed for local development: Generate self-signed certificate to run app on https locally. `openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.cert`

7.  `yarn build` - creates a production ready build of the React app.

8.  `yarn start` - starts the application server on port 3000.

9.  open `https://localhost:3000`.

## Development

* All requests made by React app to `/graphql` are proxied to the PH API. The user access token is encrypted and stored in the session cookie.

* If your app only requires `public` scope token, you can fetch one using the command below and put it in the `.env` file under `PH_APP_CLIENT_CREDENTIALS_TOKEN`

```
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"client_id":"YOUR_API_KEY_HERE","client_secret":"YOUR_API_SECRET_HERE", "grant_type": "client_credentials"}' \
  https://api.producthunt.com/v2/oauth/token
```

* Use `ENABLE_HTTPS=true` in `.env` file while developing locally.

* Change made to the React app need to be rebuilt every time using `yarn build`. This is not ideal and needs to be migrated to HMR to ease development, PRs for same are appreciated :)

## API

The API supports 3 scopes as of now:

`public` - Allows to access public information on Product Hunt.

`private` - Allows to access Product Hunt on behalf of the authenticated user. e.g Read goals of the user.

`write` - Allows to write data to Product Hunt on behalf of the authenticated user. e.g Mark goals of user as complete/incomplete.

Useful Links:

* Documentation: [https://api.producthunt.com/v2/docs](https://api.producthunt.com/v2/docs)

* GraphQL Reference: [http://api-v2-docs.producthunt.com.s3-website-us-east-1.amazonaws.com/operation/query/](http://api-v2-docs.producthunt.com.s3-website-us-east-1.amazonaws.com/operation/query/).

* API Explorer: [https://ph-graph-api-explorer.herokuapp.com/](https://ph-graph-api-explorer.herokuapp.com/)(uses GraphiQL).

For feedback, requests and bugs please visit: [https://github.com/producthunt/producthunt-api/issues](https://github.com/producthunt/producthunt-api/issues)

Happy Hacking!

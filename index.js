require("dotenv").config();
require("es6-promise").polyfill();
require("isomorphic-fetch");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const fs = require("fs");
const https = require("https");

const handleAuthorize = require("./routes/authorize");
const handleOAuthCallback = require("./routes/callback");
const handleLogout = require("./routes/logout");
const handleGraphQL = require("./routes/graphql");

const app = express();
app.use(express.static("client/build"));
app.use(bodyParser.json());
app.use(cookieParser());

app
  .get("/authorize", handleAuthorize)
  .get("/callback", handleOAuthCallback)
  .post("/logout", handleLogout)
  .post("/graphql", handleGraphQL);

// Create https server while developing locally since redirect_uri
// for the app has to be https enabled. For e.g https://localhost:3000/callback
const serverApp = process.env.ENABLE_HTTPS
  ? https.createServer(
      {
        key: fs.readFileSync("server.key"),
        cert: fs.readFileSync("server.cert")
      },
      app
    )
  : app;

serverApp.listen(process.env.PORT, function() {
  console.log(`API explorer app is listening on port ${process.env.PORT}`);
});

const jwt = require("jsonwebtoken");

const {
  PH_API_HOST,
  PH_APP_API_KEY,
  PH_APP_API_SECRET,
  PH_APP_REDIRECT_URI,
  SECRET
} = process.env;

async function fetchToken(requestBody) {
  const response = await fetch(`${PH_API_HOST}v2/oauth/token`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody)
  });
  const tokenJSON = await response.json();

  return tokenJSON && tokenJSON.access_token;
}

async function handleCallback(req, res) {
  const accessToken = await fetchToken({
    code: req.query && req.query.code,
    client_id: PH_APP_API_KEY,
    client_secret: PH_APP_API_SECRET,
    redirect_uri: PH_APP_REDIRECT_URI,
    grant_type: "authorization_code"
  });

  if (!accessToken) {
    return res.redirect("/");
  }

  const authToken = jwt.sign(accessToken, SECRET);

  res.cookie("nekot_htua", authToken);
  res.redirect("/");
}

module.exports = handleCallback;

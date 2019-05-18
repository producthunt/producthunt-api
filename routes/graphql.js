const fetch = require("isomorphic-fetch");
const jwt = require("jsonwebtoken");

const {
  PH_API_HOST,
  PH_APP_API_KEY,
  PH_APP_API_SECRET,
  PH_APP_CLIENT_CREDENTIALS_TOKEN,
  SECRET
} = process.env;

function logRateLimitInfo(response) {
  console.log("========= RATE LIMIT INFO =========");
  console.log("TOTAL => ", response.headers.get("x-rate-limit-limit"));
  console.log("REMAINING => ", response.headers.get("x-rate-limit-remaining"));
  console.log("RESET IN => ", response.headers.get("x-rate-limit-reset"));
  console.log("===================================");
}

async function proxyGraphql(req, res) {
  const { cookies } = req;

  let apiAccessToken;
  try {
    apiAccessToken = jwt.verify(cookies["nekot_htua"], SECRET);
  } catch (err) {
    apiAccessToken = PH_APP_CLIENT_CREDENTIALS_TOKEN;
  }

  const response = await fetch(`${PH_API_HOST}v2/api/graphql`, {
    method: "post",
    body: JSON.stringify(req.body),
    headers: {
      "Content-Type": "application/json",
      ...(apiAccessToken ? { Authorization: `Bearer ${apiAccessToken}` } : {})
    }
  });

  // logRateLimitInfo(response);

  res.json(await response.json());
}

module.exports = proxyGraphql;

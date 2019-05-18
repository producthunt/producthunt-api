const {
  PH_API_HOST,
  PH_APP_API_KEY,
  PH_APP_REQUESTED_SCOPES,
  PH_APP_REDIRECT_URI
} = process.env;

function handleAuthorize(req, res) {
  return res.redirect(
    `${PH_API_HOST}v2/oauth/authorize?client_id=${PH_APP_API_KEY}&redirect_uri=${PH_APP_REDIRECT_URI}&response_type=code&scope=${PH_APP_REQUESTED_SCOPES}`
  );
}

module.exports = handleAuthorize;

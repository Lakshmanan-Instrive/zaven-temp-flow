const { AuthenticationClient } = require("auth0");

const authentication = new AuthenticationClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
});

const getAccessToken = async () => {
  return await authentication.oauth.clientCredentialsGrant({
    audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
  }).then((res) => res.data.access_token);
}

module.exports = {
  authentication,
  getAccessToken
};

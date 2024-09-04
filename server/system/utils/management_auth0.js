const { ManagementClient } = require('auth0');

const management = new ManagementClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
  token: process.env.AUTH0_TOKEN,
});

module.exports = {
  management
}

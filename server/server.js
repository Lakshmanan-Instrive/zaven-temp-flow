
const config = {
  client: {
    id: "O_PeJu6vS0qZM685alCYA",
    secret: "AhSh5a4ZB4BN6YqZaA3T07JK3F4eD5pw",
  },
  auth: {
    tokenHost: "https://zoom.us",
  },
};

const {
  ClientCredentials,
  ResourceOwnerPassword,
  AuthorizationCode,
} = require("simple-oauth2");
async function authorization() {
  const client = new AuthorizationCode(config);

  const authorizationUri = client.authorizeURL({
    redirect_uri: "http://localhost:3000/callback",
    scope: "*",
    state: "*",
    customParam: "foo", // non-standard oauth params may be passed as well
  });

  // res.redirect(authorizationUri);

  const tokenParams = {
    code: "<code>",
    redirect_uri: "http://localhost:3000/callback",
    scope: "<scope>",
  };

  try {
    const accessToken = await client.getToken(tokenParams);
    console.log(accessToken,"accessToken")
  } catch (error) {
    console.log("Access Token Error", error.message);
  }
}

authorization();

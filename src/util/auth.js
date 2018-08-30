import auth0 from 'auth0-js';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: process.env.INFERNO_APP_AUTH0_DOMAIN,
    clientID: process.env.INFERNO_APP_AUTH0_CLIENT_ID,
    redirectUri: process.env.INFERNO_APP_AUTH0_REDIRECT_URI,
    audience: process.env.INFERNO_APP_API_URL,
    responseType: 'token id_token',
    scope: 'openid'
  })

  login = () => {
    this.auth0.authorize()
  }

  handleAuthentication = () => new Promise((resolve, reject) => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        resolve(authResult)
      } else if (err) {
        reject(err)
      }
    })
  })
}
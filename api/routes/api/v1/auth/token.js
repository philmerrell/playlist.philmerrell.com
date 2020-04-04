const axios = require('axios')
const querystring = require('querystring')
const Router = require('express').Router
const { cognito_client_id, cognito_client_secret, cognito_redirect_uri, cognito_base_url } = require('../../../../config');
const cookieParser = require('cookie-parser')

module.exports = Router({ mergeParams: true })
  .post('/v1/auth/token', async (req, res, next) => {
    const code = req.body.code || false;
    const state = req.body.state || false;

      cookieParser()(req, res, async () => {
        if (!req.cookies.state) {
          throw new Error('State cookie not set or expired. Maybe you took too long to authorize. Please try again.');
        } else if (req.cookies.state !== state) {
          throw new Error('State validation failed');
        }
        if (code && state) {
          try {
            const response = await axios({
              method: 'POST',
              url: `${cognito_base_url}/oauth2/token`,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Basic ' + Buffer.from(`${cognito_client_id}:${cognito_client_secret}`).toString('base64')
              },
              data: querystring.stringify(getRequestParameters(code))
            });
            res.json(response.data);
          } catch (error) {
            next(error)
          }
        } else {
          res.status(400).json({ error: 'code parameter missing' })
        }
      });
  });

function getRequestParameters(code) {
  return {
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: cognito_redirect_uri,
    client_id: cognito_client_id
  }
}

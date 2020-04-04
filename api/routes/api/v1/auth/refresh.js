const axios = require('axios')
const querystring = require('querystring')
const Router = require('express').Router
const { cognito_client_id, cognito_client_secret, cognito_base_url } = require('../../../../config');

module.exports = Router({ mergeParams: true })
  .post('/v1/auth/refresh', async (req, res, next) => {
    const refreshToken = req.body.refresh_token;
    if (refreshToken) {
      try {
        const response = await axios({
          method: 'POST',
          url: `${cognito_base_url}/oauth2/token`,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + Buffer.from(`${cognito_client_id}:${cognito_client_secret}`).toString('base64')
          },
          data: querystring.stringify(getRequestParameters(refreshToken))
        });
        res.json(response.data);
      } catch (error) {
        next(error)
      }
    } else {
      res.status(400).json({ error: 'refresh_token parameter missing' })
    }

  });

function getRequestParameters(refresh_token) {
  return {
    grant_type: 'refresh_token',
    refresh_token,
    client_id: cognito_client_id
  }
}

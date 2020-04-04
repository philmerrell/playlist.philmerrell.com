const Router = require('express').Router
const { cognito_client_id, cognito_base_url, cognito_logout_uri} = require('../../../../config');


module.exports = Router({ mergeParams: true })
  .get('/v1/auth/logout', async (req, res, next) => {
    try {
      const redirectUrl = encodeURIComponent(cognito_logout_uri);
      const logoutUrl = `${cognito_base_url}/logout?client_id=${cognito_client_id}&logout_uri=${redirectUrl}`;
      res.status(301).redirect(logoutUrl);
    } catch (error) {
      next(error)
    }
  });

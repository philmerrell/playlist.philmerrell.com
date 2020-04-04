const Router = require('express').Router
const { cognito_client_id, cognito_redirect_uri, cognito_base_url, env } = require('../../../../config');
const cookieParser = require('cookie-parser');
const { randomBytes } = require('crypto');
const isLocal = env === 'local' ? true : false;

module.exports = Router({ mergeParams: true })
  .get('/v1/auth/login', async (req, res, next) => {
    console.log(env);

    try {
      cookieParser()(req, res, () => {
        const state = req.cookies.state || generateStateValue();
        res.cookie('state', state.toString(), { maxAge: 3600000, secure: isLocal ? false : true, httpOnly: true });
        const urlEncodedRedirect = encodeURIComponent(cognito_redirect_uri);
        const loginInQueryParams = `/login?response_type=code&client_id=${cognito_client_id}&redirect_uri=${urlEncodedRedirect}&state=${state.toString()}&scope=openid`;
        res.status(301).redirect(cognito_base_url + loginInQueryParams);
      });
    } catch (error) {
      next(error)
    }
  });

function generateStateValue() {
  return randomBytes(20).toString('hex');

}
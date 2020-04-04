const Router = require('express').Router
const { cognito_client_id, cognito_redirect_uri, cognito_base_url } = require('../../../../config');

module.exports = Router({mergeParams: true})
.get('/v1/auth/signup', async (req, res, next) => {
    try {
        const urlEncodedRedirect = encodeURIComponent(cognito_redirect_uri);
        const loginInQueryParams = `/signup?response_type=code&client_id=${cognito_client_id}&redirect_uri=${urlEncodedRedirect}`;
        res.status(301).redirect(cognito_base_url + loginInQueryParams);
    } catch (error) {
        next(error)
    }
  });

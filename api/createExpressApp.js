const express = require('express')
const bodyParser = require('body-parser')
// const expressWinston = require('express-winston')
const router = require('./routes/createRouter.js')()
const database = require('./database/createDatabase.js')()
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
var jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa');
const { client_domain_name, cognito_client_id, cognito_userpool_id, aws_region } = require('./config')

module.exports = () => express()
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use((req, res, next) => {
    req.base = `${req.protocol}://${req.get('host')}`
    // req.logger = logger
    req.db = database
    return next()
  })
  .use(awsServerlessExpressMiddleware.eventContext())
  .use(function (req, res, next) {
    const allowedOrigins = [ client_domain_name ];
    const origin = req.headers.origin;
    if (allowedOrigins.indexOf(origin) > -1) {
      res.header("Access-Control-Allow-Origin", origin);
    }
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    res.header("Strict-Transport-Security", "max-age=31536000; includeSubDomains")
    res.header("X-Frame-Options", "SAMEORIGIN")
    res.header("X-Content-Type-Options", "nosniff")
    res.header("Content-Security-Policy", "default-src 'self'")
    res.header("Feature-Policy", "sync-xhr 'self'")
    res.header("Referrer-Policy", "no-referrer")
    next()
  })
  .use(express.static('./public'))
  .use(
    jwt({ 
      secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://cognito-idp.${aws_region}.amazonaws.com/${cognito_userpool_id}/.well-known/jwks.json`
      }),
      // audience: cognito_client_id,
      issuer: `https://cognito-idp.${aws_region}.amazonaws.com/${cognito_userpool_id}`,
      algorithms: [ 'RS256' ]
    }).unless({path: [
      '/api/v1/auth/token',
      '/api/v1/auth/refresh',
      '/api/v1/auth/login',
      '/api/v1/auth/signup',
      '/api/v1/auth/logout']}))
  .use('/api', router)
  .use((error, req, res, next) => {
    console.log('Error: ', error)
    res.status(error.status || 500).json({ error })
  })
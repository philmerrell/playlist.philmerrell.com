const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  env:                    process.env.NODE_ENV,
  aws_region:             process.env.AWS_REGION,
  cognito_base_url:       process.env.COGNITO_BASE_URL,
  cognito_client_id:      process.env.COGNITO_CLIENT_ID,
  cognito_client_secret:  process.env.COGNITO_CLIENT_SECRET,
  cognito_redirect_uri:   process.env.COGNITO_REDIRECT_URI,
  cognito_logout_uri:     process.env.COGNITO_LOGOUT_URI,
  cognito_userpool_id:    process.env.COGNITO_USERPOOL_ID,
  client_domain_name:     process.env.CLIENT_DOMAIN_NAME,
  client_secret:          process.env.COGNITO_CLIENT_SECRET,
  dynamo_table_name:      process.env.DYNAMO_TABLE_NAME
};
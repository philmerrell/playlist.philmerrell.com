const awsServerlessExpress = require('aws-serverless-express');
// const logger = require('./logger.js')
// const database = require('./database/createDatabase.js')({ logger })

const app = require('./createExpressApp.js')();
app.disable('x-powered-by');
const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  awsServerlessExpress.proxy(server, event, context);
};

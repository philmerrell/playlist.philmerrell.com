const AWS = require('aws-sdk')
const { env } = require('../config');

module.exports = () => {
    let dynamoDb;
    if (env === 'local') {
      dynamoDb = new AWS.DynamoDB.DocumentClient({ region: 'localhost', endpoint: 'http://localhost:8000'})
    } else {
      dynamoDb = new AWS.DynamoDB.DocumentClient();
    }
    
    return dynamoDb;
}
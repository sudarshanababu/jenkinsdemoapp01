'use strict';

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.TABLE_NAME;

exports.lambda_handler = (event, context, callback) => {
  console.log('Received event:', JSON.stringify(event, null, 2));
  const order = build_order(event);

  var params = {
    TableName: tableName,
    Key: {
      name: order.name
    }
  };

  docClient.delete(params, function(err, data) {
    if (err) callback(err)
    else callback(null, {
      statusCode: 200
    });
  });
};

var build_order = function(event) {
  const name = event.pathParameters.name;
  console.log('name: ', name);

  return {
    name: name
  };
};

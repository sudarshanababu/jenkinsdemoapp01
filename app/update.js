'use strict';

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

exports.lambda_handler = (event, context, callback) => {
  console.log('Received event:', JSON.stringify(event, null, 2));

  const tableName = process.env.TABLE_NAME;
  const order = build_order(event);

  var params = {
    TableName: tableName,
    Item: {
      name: order.name,
      order_type: order.order_type,
      description: order.description
    }
  };

  docClient.put(params, function(err, data) {
    if (err) callback(err)
    else callback(null, {
      statusCode: 200,
      body: JSON.stringify(order)
    });
  });
};

var build_order = function(event) {
  const name = event.pathParameters.name;
  const body = JSON.parse(event.body);
  console.log('name: ', name, ', body: ', JSON.stringify(body));

  return {
    name: name,
    order_type: body.order_type,
    description: body.description
  };
};

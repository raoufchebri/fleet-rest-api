'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

function random(min, max) {
  return Math.random() * (max - min) + min;
}

module.exports.create = (event, context, callback) => {
  
  // Simulate GPS coord in Switzerland
  const minLat = 46.092000
  const maxLat = 47.431388
  const minLon = 6.121452
  const maxLon = 10.384751
  
  const { name, vin, make, model, year, fuelType, type, odometer} = JSON.parse(event.body);
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: uuid.v1(),
      name,
      vin,
      make,
      model, year, fuelType,
      type,
      position: {
        lat: random(minLat, maxLat),
        lon: random(minLon, maxLon)
      },
      odometer,
      fuel: random(1, 99),
      battery: random(1, 99)
    },
  };

  dynamoDb.put(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t create the todo item.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
      },
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
};

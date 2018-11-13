const express = require('express');
const cors = require('cors');

const whitelist = ['http://localhost:3000', 'https://localhost:34443'];

const checkOrigin = (origin, callback) => {
  console.log('Origin: ', origin);
  if (whitelist.includes(origin)) {
    return callback(null, true);
  } else {
    return callback(new Error('The CORS policy does not allow access from this origin.'), false);
  }
};

exports.cors = cors();
exports.corsWithOptions = cors({ origin: checkOrigin });

const express = require('express');
const app = express();
const helloController = require('../controllers/helloController');

app.get('/api/hello', helloController.getHello);

module.exports = app;

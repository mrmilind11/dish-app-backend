const express = require('express');
const app = express();
const { handleError } = require('./startup/errorHandler');
app.use(express.json());

require('./startup/logger')();
require('./startup/server')(app);
require('./startup/db')();
require('./startup/route')(app);
app.use(function (err, req, res, next) {
    handleError(err, res);
})
const express = require('express');
const app = express();

app.use(express.json());

require('./startup/server')(app);
require('./startup/db')();
require('./startup/route')(app);
require('./startup/logger');
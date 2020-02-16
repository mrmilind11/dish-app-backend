const express = require('express');
const app = express();

app.use(express.json());

require('./startup/logger')();
require('./startup/server')(app);
require('./startup/db')();
require('./startup/route')(app);

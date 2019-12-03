const express = require('express');
const commentRouter = require('./routes/comments');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api/comments', commentRouter);


module.exports = app;
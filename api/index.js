const express = require('express');
const bodyParser = require('body-parser');
const database = require('../database');
const app = express();
app.use(bodyParser.json());

app.get('/list', function (req, res) {
    //TODO Fill here
});

app.post('/create', function (req, res) {
    //TODO Fill here
});

app.put('/update', function (req, res) {
    //TODO Fill here
});

app.delete('/delete/:deleteId', function (req, res) {
    //TODO Fill here
});

module.exports = app;

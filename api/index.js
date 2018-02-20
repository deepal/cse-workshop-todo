const express = require('express');
const bodyParser = require('body-parser');
const database = require('../database');
const app = express();
app.use(bodyParser.json());

app.get('/list', function (req, res) {
    try {
        const todos = database.getToDoList();
        res.status(200).send(todos);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/create', function (req, res) {
    try {
        database.createToDo(req.body.title);
        res.status(200).send({ success: true, message: 'todo created successfully' });
    } catch (err) {
        res.status(500).send(err);
    }
});

app.put('/update', function (req, res) {
    try {
        database.updateToDo(req.body.id, {
            title: req.body.title,
            done: req.body.done
        });
        res.status(200).send({ success: true, message: 'todo updated successfully' });
    } catch(err) {
        res.status(500).send(err);
    }
});

app.delete('/delete/:deleteId', function (req, res) {
    try {
        database.deleteTodo(req.params.deleteId);
        res.status(200).send({ success: true, message: 'todo deleted successfully' });
    } catch(err) {
        res.status(500).send(err);
    }
});

module.exports = app;

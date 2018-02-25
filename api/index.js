const express = require('express');
const bodyParser = require('body-parser');
const database = require('../database');
const app = express();
app.use(bodyParser.json());

app.get('/list', function (req, res) {
    const todos = database.getToDoList();
    res.status(200).send(todos);
});

app.post('/create', function (req, res) {
    const todoTitle = req.body.title;
    database.createToDo(todoTitle);
    res.status(201).send({
        message: `todo created with title: ${todoTitle}`
    });
});

app.put('/update', function (req, res) {
    const todoId = req.body.id;
    const newTodoTitle = req.body.title;
    const newTodoStatus = req.body.done;
    database.updateToDo(todoId, {
        title: newTodoTitle,
        done: newTodoStatus
    });
    res.status(200).send({
        message: `todo with id ${todoId} updated`
    });
});

app.delete('/delete', function (req, res) {
    const deletingTodoId = req.query.id;
    database.deleteTodo(deletingTodoId);
    res.status(200).send({
        message: `todo with id ${deletingTodoId} deleted`
    });
});

module.exports = app;

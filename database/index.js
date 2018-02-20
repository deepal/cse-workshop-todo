const fs = require('fs');

// creepy zone start:
const readFile = fs.readFileSync;
const writeFile = fs.writeFileSync;

// creepy zone end: this app does not follow best practices at all. It's only for demonstration purposes. Don't use sync functions in routes when you write nodejs apps.

function createToDo(title) {
    console.log(`creating a todo in database for title : ${title}`);
    const todos = JSON.parse(readFile('./database/tododata.json'));
    const lastTodoId = todos && todos.length > 0 ? todos.slice(-1)[0].id : -1;
    const newTodoId = lastTodoId + 1;
    todos.push({
        id: newTodoId,
        title,
        done: false
    });
    return writeFile('./database/tododata.json', JSON.stringify(todos));
}

function getToDoList() {
    console.log('getting todo list from database');
    return JSON.parse(readFile('./database/tododata.json'));
}

function deleteTodo(todoId) {
    // find the typing bug here
    console.log(`delete todo from database with id : ${todoId}`);
    const currentTodos = JSON.parse(readFile('./database/tododata.json'));
    const newTodosAfterDeletion = currentTodos.filter(function (todo) {
        return todo.id !== todoId
    });
    return writeFile('./database/tododata.json', JSON.stringify(newTodosAfterDeletion));
}

function updateToDo(todoId, {title, done}) {
    console.log(`updating todo id ${todoId} with new title : ${title}`);
    const currentTodos = JSON.parse(readFile('./database/tododata.json'));
    const newTodosAfterUpdate = currentTodos.map(function (todo) {
        if (todo.id === todoId) return Object.assign({}, todo, {
            title: title || todo.title,
            done: done === undefined ? todo.done : done
        });
        return todo;
    });
    return writeFile('./database/tododata.json', JSON.stringify(newTodosAfterUpdate));
}

module.exports = {createToDo, getToDoList, deleteTodo, updateToDo};

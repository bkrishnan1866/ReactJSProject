const express = require('express');
const todoListDAO = require('../dao/todoListDAO');

const todoListAPI = express.Router();

todoListAPI.get('/', async (req, res) => {
    try {
        console.log('Inside Select Todo List API');
        let rows = await todoListDAO.selAllUnArchivedTodoList();
        res.type('json');
        res.json({ "todoList": rows});
    }catch(error) {
        console.log('ERROR: Inside Todo List API - SELECT ' + error);
        res.type('json');
        res.json({"Message":"Error Occurred"});
    }
})

todoListAPI.get('/fu', async (req, res) => {
    try {
        console.log('Inside Select Todo List API');
        const data = req.body;
        console.log(data);
        let rows = await todoListDAO.selTodoFollowUp(data);
        res.type('json');
        res.json({ "todoList": rows});
    }catch(error) {
        console.log('ERROR: Inside Todo List API - SELECT ' + error);
        res.type('json');
        res.json({"Message":"Error Occurred"});
    }
})

todoListAPI.post('/', async (req, res) => {
    try{
        console.log('Inside Adding Todo List API' );
        const data = req.body;
        console.log(data);
        let rows = await todoListDAO.insertTodoList(data);
        res.type('json');
        res.json({"Message":"Successfully Added"});
    }catch(error) {
        console.log('ERROR: Inside Todo List API - INSERT ' + error);
        res.type('json');
        res.json({"Message":"Error Occurred"});
    }
})

todoListAPI.put('/', async (req, res) => {
    try{
        console.log('Inside Updating Todo List API' );
        const data = req.body;
        console.log(data);
        let rows = await todoListDAO.updateTodoList(data);
        res.type('json');
        res.json({"Message":"Successfully Updated"});
    }catch(error) {
        console.log('ERROR: Inside Todo List API - UPDATE ' + error);
        res.type('json');
        res.json({"Message":"Error Occurred"});
    }
})

module.exports = todoListAPI;
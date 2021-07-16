const express = require('express');
const orderDAO = require('../dao/orderDAO');

const orderAPI = express.Router();

orderAPI.get('/:id', async (req, res) => {
    try {
        console.log('Inside Select Order API');
        const data = req.params.id;
        console.log(data);
        let rows = await orderDAO.selOrderById(data);
        res.type('json');
        res.json({ "order": rows});
    }catch(error) {
        console.log('ERROR: Inside Order API - SELECT ' + error);
        res.type('json');
        res.json({"Message":"Error Occurred"});
    }
})

orderAPI.get('/status/:id', async (req, res) => {
    try {
        console.log('Inside Select Order API');
        const data = req.params.id;
        console.log(data);
        let rows = await orderDAO.selAllOrdersByStatus(data);
        res.type('json');
        res.json({ "order": rows});
    }catch(error) {
        console.log('ERROR: Inside Order API - SELECT ' + error);
        res.type('json');
        res.json({"Message":"Error Occurred"});
    }
})


orderAPI.post('/', async (req, res) => {
    try{
        console.log('Inside Adding Order API' );
        const data = req.body;
        let rows = await orderDAO.insertOrder(data);
        res.type('json');
        res.json({"Message":"Successfully Added"});
    }catch(error) {
        console.log('ERROR: Inside Order API - INSERT ' + error);
        res.type('json');
        res.json({"Message":"Error Occurred"});
    }
})

orderAPI.put('/', async (req, res) => {
    try{
        console.log('Inside Updating Order API' );
        const data = req.body;
        let rows = await orderDAO.updateOrder(data);
        res.type('json');
        res.json({"Message":"Successfully Updated"});
    }catch(error) {
        console.log('ERROR: Inside Order API - UPDATE ' + error);
        res.type('json');
        res.json({"Message":"Error Occurred"});
    }
})

module.exports = orderAPI;
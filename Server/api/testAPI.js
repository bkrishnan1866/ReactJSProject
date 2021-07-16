const express = require('express');
const utilityDAO = require('../dao/utilityDAO');

const testRouter = express.Router();

testRouter.get('/', async (req, res) => {
    let rows = await utilityDAO.selAllWeaverList();
    console.log(rows);
    res.send('Message sent from test API');
})

module.exports = testRouter;
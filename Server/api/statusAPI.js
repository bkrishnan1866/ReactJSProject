const express = require('express');
const statusDAO = require('../dao/statusDAO')

const statusAPI = express.Router();

statusAPI.get('/', async (req, res) => {
    try {
        console.log('Inside Status List API');
        let rows = await statusDAO.getStatusList();
        console.log(rows);
        res.type('json');
        res.json({ "statuslist": rows});
    }catch(error) {
        console.log('ERROR: Inside Status List API - SELECT ' + error);
        res.type('json');
        res.json({"Message":"Error Occurred"});
    }
})

module.exports = statusAPI;

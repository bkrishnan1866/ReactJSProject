const express = require('express');
const weaverDAO = require('../dao/weaverDAO');

const weaverAPI = express.Router();

weaverAPI.get('/', async (req, res) => {
    try {
        console.log('Inside Select Weaver API');
        let rows = await weaverDAO.selActiveWeaverList();
        res.type('json');
        res.json({ "weaverList": rows});
    }catch(error) {
        console.log('ERROR: Inside Weaver API - SELECT ' + error);
        res.type('json');
        res.json({"Message":"Error Occurred"});
    }
})

weaverAPI.get('/inactive', async (req, res) => {
    try {
        console.log('Inside Select Inactive Weaver API');
        let rows = await weaverDAO.selInactiveWeaverList();
        res.type('json');
        res.json({ "weaverList": rows});
    }catch(error) {
        console.log('ERROR: Inside Weaver API - SELECT ' + error);
        res.type('json');
        res.json({"Message":"Error Occurred"});
    }
})

weaverAPI.get('/:id', async (req, res) => {
    try {
        console.log('Inside Select Weaver API By Id');
        const data = req.params.id;
        console.log(data);
        let rows = await weaverDAO.selWeaverByid(data);
        res.type('json');
        res.json({ "weaverData": rows});
    }catch(error) {
        console.log('ERROR: Inside Weaver API - SELECT ' + error);
        res.type('json');
        res.json({"Message":"Error Occurred"});
    }
})

weaverAPI.post('/', async (req, res) => {
    try{
        console.log('Inside Adding Weaver in Weaver API' );
        const data = { s_weaver_name, s_weaver_location, s_created_by, s_updated_by } = req.body;
        console.log(data);
        let rows = await weaverDAO.insertWeaver(data);
        console.log('Row count ' + rows);
        res.type('json');
        res.json({"Message":"Successfully Added"});
    }catch(error) {
        console.log('ERROR: Inside Weaver API - INSERT ' + error);
        res.type('json');
        res.json({"Message":"Error Occurred"});
    }
})

weaverAPI.put('/', async (req, res) => {
    try{
        console.log('Inside Updating Weaver in Weaver API' );
        const data = req.body;
        console.log(data);
        let rows = await weaverDAO.updateWeaver(data);
        res.type('json');
        res.json({"Message":"Successfully Updated"})
    }catch(error) {
        console.log('ERROR: Inside Weaver API - UPDATE ' + error);
        res.type('json');
        res.json({"Message":"Error Occurred"});
    }
})

weaverAPI.put('/activate', async (req, res) => {
    try{
        console.log('Inside Updating Activate Weaver in Weaver API' );
        const data = req.body;
        console.log(data);
        let rows = await weaverDAO.updateWeaver(data);
        res.type('json');
        res.json({"Message":"Successfully Activated"})
    }catch(error) {
        console.log('ERROR: Inside Weaver API - UPDATE ' + error);
        res.type('json');
        res.json({"Message":"Error Occurred"});
    }
})

weaverAPI.put('/deactivate', async (req, res) => {
    try{
        console.log('Inside Updating Activate Weaver in Weaver API' );
        const data = req.body;
        console.log(data);
        let rows = await weaverDAO.updateWeaver(data);
        res.type('json');
        res.json({"Message":"Successfully Deactivated"})
    }catch(error) {
        console.log('ERROR: Inside Weaver API - UPDATE ' + error);
        res.type('json');
        res.json({"Message":"Error Occurred"});
    }
})




module.exports = weaverAPI;
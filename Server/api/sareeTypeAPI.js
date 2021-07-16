const express = require('express');
const sareeTypeDAO = require('../dao/sareeTypeDAO');

const sareeTypeAPI = express.Router();

sareeTypeAPI.get('/', async (req, res) => {
    try {
        console.log('Inside Select Saree Type API');
        let rows = await sareeTypeDAO.selActiveSareeType();
        res.type('json');
        res.json({ "sareeList": rows});
    }catch(error) {
        console.log('ERROR: Inside Saree Type API - SELECT ' + error);
        res.type('json');
        res.json({"Message":"Error Occurred"});
    }
})

sareeTypeAPI.get('/inactive', async (req, res) => {
    try {
        console.log('Inside Select Inactive Saree API');
        let rows = await sareeTypeDAO.selInActiveSareeType();
        res.type('json');
        res.json({ "sareeList": rows});
    }catch(error) {
        console.log('ERROR: Inside Saree API - SELECT ' + error);
        res.type('json');
        res.json({"Message":"Error Occurred"});
    }
})

sareeTypeAPI.get('/:id', async (req, res) => {
    try {
        console.log('Inside Select Saree Type API');
        const data = req.params.id;
        console.log(data);
        let rows = await sareeTypeDAO.selSareeTypeById(data);
        res.type('json');
        res.json({ "sareeData": rows});
    }catch(error) {
        console.log('ERROR: Inside Saree Type API - SELECT ' + error);
        res.type('json');
        res.json({"Message":"Error Occurred"});
    }
})


sareeTypeAPI.post('/', async (req, res) => {
    try{
        console.log('Inside Adding Saree Type API' );
        const data = { s_saree_type_description, s_created_by, s_updated_by } = req.body;
        console.log(data);
        let rows = await sareeTypeDAO.insertSareeType(data);
        res.type('json');
        res.json({"Message":"Successfully Added"});
    }catch(error) {
        console.log('ERROR: Inside Saree Type API - INSERT ' + error);
        res.type('json');
        res.json({"Message":"Error Occurred"});
    }
})

sareeTypeAPI.put('/', async (req, res) => {
    try{
        console.log('Inside Updating Saree Type API' );
        const data = req.body;
        let rows = await sareeTypeDAO.updateSareeType(data);
        res.type('json');
        res.json({"Message":"Successfully Updated"});
    }catch(error) {
        console.log('ERROR: Inside Saree Type API - UPDATE ' + error);
        res.type('json');
        res.json({"Message":"Successfully Updated"})
    }
})

sareeTypeAPI.put('/activate', async (req, res) => {
    try{
        console.log('Inside Updating Activate Saree in Saree API' );
        const data = req.body;
        console.log(data);
        let rows = await sareeTypeDAO.updateSareeType(data);
        res.type('json');
        res.json({"Message":"Successfully Activated"})
    }catch(error) {
        console.log('ERROR: Inside Saree API - UPDATE ' + error);
        res.type('json');
        res.json({"Message":"Error Occurred"});
    }
})

sareeTypeAPI.put('/deactivate', async (req, res) => {
    try{
        console.log('Inside Updating Activate Saree in Saree API' );
        const data = req.body;
        console.log(data);
        let rows = await sareeTypeDAO.updateSareeType(data);
        res.type('json');
        res.json({"Message":"Successfully Deactivated"})
    }catch(error) {
        console.log('ERROR: Inside Saree API - UPDATE ' + error);
        res.type('json');
        res.json({"Message":"Error Occurred"});
    }
})

module.exports = sareeTypeAPI;
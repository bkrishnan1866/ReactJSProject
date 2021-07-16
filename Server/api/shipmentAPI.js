const express = require('express');
const shipmentDAO = require('../dao/shipmentDAO');

const shipmentAPI = express.Router();

shipmentAPI.get('/order/:id', async(req, res) => {
    try{
        console.log('Inside Select Shipment API by Order Id');
        const data = req.params.id;
        console.log(data);
        const rows1 = await shipmentDAO.selCustDetailsByOrderIds(data);
        const rows2 = await shipmentDAO.selWeaverDetailsByOrderIds(data);
        const rows3 = await shipmentDAO.selProfileDetails();
        let newArray = [...rows1, ...rows2, ...rows3];
        res.type('json');
        res.json({ "shipmentList": newArray});
    }catch(error) {
        console.log('ERROR: Inside Shipment API - SELECT ' + error);
        res.type('json');
        res.json({"Message":"Error Occurred"});
    }

})

shipmentAPI.get('/:id', async (req, res) => {
    try {
        console.log('Inside Select Shipment by Shipment Id API');
        const data = req.params.id;
        console.log(data);
        let rows = await shipmentDAO.selShipmentById(data);
        console.log(rows);
        res.type('json');
        res.json({ "shipment": rows});
    }catch(error) {
        console.log('ERROR: Inside Shipment API - SELECT ' + error);
        res.type('json');
        res.json({"Message":"Error Occurred"});
    }
})


shipmentAPI.post('/', async (req, res) => {
    try{
        console.log('Inside Adding Shipment API' );
        const data = req.body[0];
        const orderIds = req.body[1];
        let rows1 = await shipmentDAO.insertShipment(data);
        let rows2 = await shipmentDAO.updateOrder(orderIds);
        res.type('json');
        res.json({"Message":"Successfully Added"});
    }catch(error) {
        console.log('ERROR: Inside Shipment API - INSERT ' + error);
        res.type('json');
        res.json({"Message":"Error Occurred"});
    }
})

shipmentAPI.put('/', async (req, res) => {
    try{
        console.log('Inside Updating Shipment API' );
        const data = req.body;
        let rows = await shipmentDAO.updateShipment(data);
        res.type('json');
        res.json({"Message":"Successfully Updated"});
    }catch(error) {
        console.log('ERROR: Inside Shipment API - UPDATE ' + error);
        res.type('json');
        res.json({"Message":"Error Occurred"});
    }
})

module.exports = shipmentAPI;
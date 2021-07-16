const express = require('express');
const profileDAO = require('../dao/profileDAO');

const profileRouter = express.Router();

profileRouter.get('/', async (req, res) => {
    console.log('Inside Profile Router ');
    let rows = await profileDAO.select(null);
    res.type('json');
    res.json({ "profileList": rows});
})

profileRouter.get('/list', async (req, res) => {
    console.log('Inside Profile Router ');
    let rows = await profileDAO.selectProfileList();
    res.type('json');
    res.json({ "profileList": rows});
})

module.exports = profileRouter;
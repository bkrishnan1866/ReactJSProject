const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const cc_application = express();
const port = process.env.port || 1866;

const Router = require('./router/Router');
const profileAPI = require('./api/profileAPI'); 

const corsOptions = {
    origin: `http://localhost:3000`, //the port my react app is running on.
    credentials: true,
};

cc_application.use(cors(corsOptions));
cc_application.use(bodyParser.json());

new Router(cc_application);

cc_application.listen(port, () => {
    console.log('Application Web Server Started.....');
})
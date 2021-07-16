const profileAPI = require('../api/profileAPI');
const weaverAPI = require('../api/weaverAPI');
const sareeTypeAPI = require('../api/sareeTypeAPI');
const todoListAPI = require('../api/todoListAPI');
const shipmentAPI = require('../api/shipmentAPI');
const orderAPI = require('../api/orderAPI');
const statusAPI = require('../api/statusAPI');

class Router {
    constructor(cc_application) {
        this.setRoute(cc_application);
    }

    setRoute(cc_application) {
        cc_application.use('/api/profile', profileAPI);
        cc_application.use('/api/weaver', weaverAPI);
        cc_application.use('/api/saree', sareeTypeAPI);
        cc_application.use('/api/todoList', todoListAPI);
        cc_application.use('/api/shipment', shipmentAPI);
        cc_application.use('/api/order', orderAPI);
        cc_application.use('/api/status', statusAPI);
    }
}

module.exports = Router; 
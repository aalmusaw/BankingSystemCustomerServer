const route = require('express').Router();
const getMerchants = require('../controllers/merchantController').getMerchants;
const payBill = require('../controllers/merchantController').payBill;

route.get('/merchant', (req, res) => {
    getMerchants(req, res);
});

route.post('/merchant/:recipient', (req, res) => {
    payBill(req, res);
});

module.exports = route;
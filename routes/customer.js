const route = require('express').Router();
const getCustomerByEmail = require('../controllers/customerController').getCustomerByEmail;
const transferBalance = require('../controllers/customerController').transferBalance;
route.get('/customer/:email', (req, res) => {
    getCustomerByEmail(req, res);
});

route.post('/customer/:recipient', (req, res) => {
    transferBalance(req, res);
});

module.exports = route;
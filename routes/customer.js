const route = require('express').Router();
const Customer = require('../models/Customer');
const getCustomerByEmail = require('../controllers/customerController').getCustomerByEmail;

route.get('/customer/:email', (req, res) => {
    getCustomerByEmail(req, res);
});

module.exports = route;
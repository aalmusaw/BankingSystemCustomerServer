const route = require('express').Router();
const getCustomerByEmail = require('../controllers/customerController').getCustomerByEmail;

route.get('/customer/:email', (req, res) => {
    getCustomerByEmail(req, res);
});

module.exports = route;
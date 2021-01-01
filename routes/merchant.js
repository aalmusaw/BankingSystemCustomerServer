const route = require('express').Router();
const getMerchants = require('../controllers/merchantController').getMerchants;

route.get('/merchant', (req, res) => {
    getMerchants(req, res);
});

module.exports = route;
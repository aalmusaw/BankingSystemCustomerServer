const Customer = require('../models/Customer');

module.exports.getCustomerByEmail = function(req, res) {
    const email = req.params.email;
    const filter = {email: email};
    Customer.findOne(filter, (err, doc) => {
        if (err) {
            res.status(400).json({
                message: 'No user exists with this email address.'
            });
        }
        else {
            res.status(200).json(doc.toObject());
        }
    });
}
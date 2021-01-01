const Merchant = require('../models/Merchant');

module.exports.getMerchants = function(req, res) {
    Merchant.find({}, (err, docs) => {
        if (err) {
            res.status(200).json({merchants: []});
        }
        else {
            const merchants = docs.map(obj => obj.name);
            res.status(200).json({merchants});
        }
    });
}
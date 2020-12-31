const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Merchant = new Schema(
    {
        name: {type: String, unique: true}
    },
    {
        collection: 'merchant'
    }
);

const MerchantModel = mongoose.model('Merchant', Merchant);
module.exports = MerchantModel;
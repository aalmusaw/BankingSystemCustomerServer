const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Transaction = new Schema({
    date: {type: Date, default: Date.now},
    amount: {type: Schema.Types.Decimal128, required: true},
    detail: {type: String}
});

const Account = new Schema({
    number: {type: String, unique: true, required: true},
    balance: {type: Schema.Types.Decimal128, default: 0},
    transactions: {type: [Transaction]}
});

const Customer = new Schema(
    {
        email: {type: String, unique: true, required: true},
        fname: {type: String, required: true},
        lname: {type: String, required: true},
        accounts: {type: [Account]}
    },
    {
        collection: 'customer'
    }
);

const CustomerModel = mongoose.model('Customer', Customer);

module.exports = CustomerModel;
const Merchant = require('../models/Merchant');
const Customer = require('../models/Customer');

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

module.exports.payBill = function(req, res) {
    const recipient = req.params.recipient;
    const accountNumber = req.body.accountNumber;
    let amount = req.body.amount;
    if (!accountNumber || !amount) {
        res.status(400).json({
            message: 'One of accountNumber or amount is undefined.'
        });
    }
    else {
        amount = parseFloat(amount);
        if (amount <= 0) {
            res.status(400).json({
                message: 'Only positive amounts can be paid.'
            });
        }
        else {
            const filter = {'accounts.number':accountNumber};
            Customer.findOne(filter, (err, doc) => {
                if (!doc || err) {
                    res.status(400).json({
                        message: 'This customer does not have access to the account.',
                    });
                }
                else {
                    const account = doc.accounts.filter(acc => acc.number == accountNumber)[0];
                    if (account.balance < amount) {
                        res.status(400).json({
                            message: 'Insufficient Balance'
                        });
                    }
                    else {
                        account.balance -= amount;
                        const detail = `Bill payment to ${recipient}`;
                        const transaction = {amount: -1*amount, detail: detail};
                        account.transactions.push(transaction);
                        doc.save();
                        res.sendStatus(200);
                    }
                }
            });
        }
    }
}
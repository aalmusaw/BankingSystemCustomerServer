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

module.exports.transferBalance = function(req, res) {
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
                        const detail_from = `Balance transfer to ${recipient}`;
                        const transaction_from = {amount: -1*amount, detail: detail_from};
                        account.transactions.push(transaction_from);
                        Customer.findOne({email: recipient}, (recipient_err, recipient_doc) => {
                            if (!recipient_doc || recipient_err) {
                                doc.save();
                                res.status(201).json({
                                    message: 'Balance was transferred to a user outside of this institution.'
                                });
                            }
                            else {
                                recipient_doc.accounts[0].balance += amount;
                                const detail_to = `Balance transfer from ${req.user.email}`;
                                const transaction_to = {amount: amount, detail: detail_to};
                                recipient_doc.accounts[0].transactions.push(transaction_to);
                                doc.save();
                                recipient_doc.save();
                                res.status(201).json({
                                    message: `Balance successfully transferred to user ${recipient}`
                                });
                            }
                        });
                    }
                }
            });
        }
    }
}
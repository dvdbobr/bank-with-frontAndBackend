const usersModel = require('../models/users.model');
const transactionModel = require('../models/transactions.model');


const getTransactions = async (req, res) => {
    try {
        const transactions = await transactionModel.find({})
        return res.send(transactions);
    }
    catch (err) {
        return res.send(err);
    }
}
const getTransactionsById = async (req, res) => {
    let userID = req.params.id;
    try {
        const transactions = await transactionModel.find({ "fromUser": userID })
        if (!transactions)
            return res.status(200).send('this user has no transactions')
        return res.send(transactions);
    }
    catch (err) {
        return res.send(err);
    }
}

const depositCashById = async (req, res) => {
    let userID = req.params.id;
    const { fromUser, toUser, amount } = req.body;
    try {
        if (amount < 0)
            return res.status(200).send('deposit amount should be positive')
        let user = await usersModel.findOneAndUpdate({ "userID": userID }, { $inc: { "details.cash": amount } })

        if (!user)
            return res.status(200).send("no such user")

        const transaction = new transactionModel({
            fromUser: fromUser,
            toUser: toUser,
            transactionType: "deposit",
            amount: amount
        });
        transaction.save((err) => {
            if (err) return res.json({ "error": err })
            return res.json({ "transaction completed successfully": transaction })
        });
    }
    catch (err) {
        return res.status(200).send(err)
    }

}
const withdrawCashById = async (req, res) => {
    let userID = req.params.id;
    const { amount } = req.body;
    try {
        if (amount < 0)
            return res.status(200).send('withdraw amount should be positive')
        let userDetails = await usersModel.findOne({ "userID": userID })
        if (userDetails.details.cash + userDetails.details.credit < amount)
            return res.status(200).send('cannot transfer this amount due to insufficient funds')
        let user = await usersModel.findOneAndUpdate({ "userID": userID }, { $inc: { "details.cash": -amount } })
        if (!user)
            return res.status(200).send("no such user")

        const transaction = new transactionModel({
            fromUser: userID,
            transactionType: "withdrawal",
            amount: amount
        });
        transaction.save((err) => {
            if (err) return res.json({ "error": err })
            return res.json({ "transaction completed successfully": transaction })
        });
    }
    catch (err) {
        return res.status(200).send(err)
    }

}
const transferCash = async (req, res) => {
    const { fromUser, toUser, amount } = req.body;
    try {
        if (amount < 0)
            return res.status(200).send('transfer amount should be positive')
        else if (fromUser === toUser)
            return res.status(200).send('transfering from the same user')
        let transferingUserDetails = await usersModel.findOne({ "userID": fromUser })
        if (transferingUserDetails.details.cash + transferingUserDetails.details.credit < amount)
            return res.status(200).send('cannot transfer this amount due to insufficient funds')
        let transferingUser = await usersModel.findOneAndUpdate({ "userID": fromUser }, { $inc: { "details.cash": -amount } })
        let receiving = await usersModel.findOneAndUpdate({ "userID": toUser }, { $inc: { "details.cash": amount } })

        if (!transferingUser)
            return res.status(200).send("invalid transfering user ID")
        else if (!receiving)
            return res.status(200).send('invalid receiving user ID')

        const transaction = new transactionModel({
            fromUser: fromUser,
            toUser: toUser,
            transactionType: "transfer",
            amount: amount
        });
        transaction.save((err) => {
            if (err) return res.json({ "error": err })
            return res.json({ "transaction completed successfully": transaction })
        });
    }
    catch (err) {
        return res.status(200).send(err)
    }

}

module.exports = {
    getTransactions,
    getTransactionsById,
    depositCashById,
    withdrawCashById,
    transferCash
}

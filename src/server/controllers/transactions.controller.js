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

const getFilteredByCash = (req, res) => {//filteredByCash/
    const { amount } = req.params;
    let filteredUsers = users.filter((u) => {
        return u.cash >= amount
    })
    if (amount === null) {
        return res.status(200).send("error in body")
    } else if (!filteredUsers) {
        return res.status(200).send("no such users")
    }
    res.status(200).json({ filteredUsers })
}

// const updateActiveAndDiscount = (req, res) => {
//     const id = req.params.id;
//     const { isActive, discount } = req.body
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ["isActive", "discount"]
//     const isValidOperation = updates.every((update) => {
//         return allowedUpdates.includes(update)
//     })
//     if (!isValidOperation)
//         return res.status(400).send({ error: 'invalid Updates' })
//     productModel.findByIdAndUpdate(id, { isActive: isActive, "details.discount": discount }, { new: true, runValidators: true }, (err, result) => {
//         if (err) {
//             return res.send(err);
//         }
//         else {
//             res.send(result);
//         }
//     })
// }

module.exports = {
    getTransactions,
    depositCashById,
}

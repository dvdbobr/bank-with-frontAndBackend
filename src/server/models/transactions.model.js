const mongoose = require('mongoose');
const validator = require('validator');
const transactionSchema = mongoose.Schema({
    fromUser: {
        type: String,
        required: true,
    },
    toUser: {
        type: String,
    },

    amount: {
        type: Number,
        required: true,
        validate(amount) {
            if (amount < 0)
                throw new Error('amount should be positive')
        }
    },
    transactionType: {
        type: String,
        required: true,
    }
})

const transactionmodel = mongoose.model('transactions', transactionSchema);
module.exports = transactionmodel;

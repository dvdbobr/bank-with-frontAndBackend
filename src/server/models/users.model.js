const mongoose = require('mongoose');
const validator = require('validator');
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        validate(email) {
            if (!validator.isEmail(email)) {
                throw new Error('Invalid email')
            }
        },
        unique: true
    },
    userID: {
        type: String,
        required: true,
        minLength:9,
        maxLength:9,
    },
    details: {
        cash: {
            type: Number,
            validate(price) {
                if (price < 0) {
                    throw new Error('price must be positive')
                }
            },
            default:0,
        },
        credit: {
            type: Number,
            required: false,
            default: 0
        },
        // accounts: {
        //     type: [String],
        //     validate(images) {
        //         if (images.length < 1) {
        //             throw new Error('must be at least 2 images')
        //         }
        //     }
        // },
        isActive: {
            type: Boolean,
            required: false,
            default: true
        },
        phone: {
            type: String,
            required: false,
            minLength: 10,
            maxLength: 10
        },
        dateCreated: {
            type: Date,
            default: Date.now()
        }
    }
})

const usermodel = mongoose.model('users', userSchema);
module.exports = usermodel;

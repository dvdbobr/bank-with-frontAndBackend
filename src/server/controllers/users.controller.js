const usersModel = require('../models/users.model');

const createUser = (req, res) => {
    const { name, email, userID } = req.body
    // const fields = Object.keys(req.body)
    // const allowedFields = ["isActive", "discount"]
    // const isValidOperation = fields.every((update) => {
    //     return allowedFields.includes(update)
    // })
    // if (!isValidOperation)
    //     return res.status(400).send({ error: 'invalid fields' })
    if (!name || !email || !userID)
        return res.status(200).send({ error: 'please input name and email and userID' })
    const user = new usersModel({
        name: name,
        email: email,
        userID: userID
    });
    user.save((err) => {
        if (err) return res.json({ "error": err })
        return res.json({ "created successfully": user })
    });
}

const getUsers = async (req, res) => {
    try {
        const users = await usersModel.find({})
        return res.send(users);
    }
    catch (err) {
        return res.send(err);
    }
}

const getUserById = async (req, res) => {
    let userID = req.params.id;
    try {
        let user = await usersModel.findOne({ "userID": userID })
        if (!user)
            return res.status(200).send("no such user")
        return res.status(200).send(user)
    }
    catch (err) {
        return res.status(200).send(err)
    }
}

const getActive = async (req, res) => {
    try {
        const products = await productModel.find({ "details.isActive": true })
        return res.status(200).send(products)
    }
    catch (err) {
        return res.status(200).send(err)
    }
}
// const getRange = (req, res) => {
//     productModel.find({ 'details.price': { $gt: 50, $lt: 500 } }).then((products) => {
//         return res.send(products)
//     })
// }
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
const getRange = async (req, res) => {
    const { from, to } = req.params
    try {
        const products = await productModel.find({ 'details.cash': { $gt: from, $lt: to } })
        return res.send(products)
    }
    catch (err) {
        return res.status(200).send(err)
    }
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
// const deleteProductById = async (req, res) => {
//     const id = req.params.id;
//     try {
//         const product = await productModel.findByIdAndDelete(id)
//         if (!product)
//             return res.send("no such product");
//         res.send(product)
//     }
//     catch (err) {
//         res.send(err);
//     }
// }
// const deleteProducts = async (req, res) => {
//     try {
//         const products = await productModel.remove({})
//         if (!products)
//             return res.send("no products left");
//         res.send(products)
//     }
//     catch (err) {
//         res.send(err);
//     }
// }
module.exports = {
    createUser,
    getUsers,
    getUserById,
    getActive,
    // getRange,
    // updateProductById: updateActiveAndDiscount,
    // deleteProductById,
    // deleteProducts
}

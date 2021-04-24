const usersModel = require('../models/users.model');

const createUser = (req, res) => {
    const { name, email, userID } = req.body
    const fields = Object.keys(req.body)
    const allowedFields = ["name", "email", "userID"]
    const isValidOperation = fields.every((update) => {
        return allowedFields.includes(update)
    })
    if (!isValidOperation)
        return res.status(400).send({ error: 'invalid fields' })
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
const updateCreditById = async (req, res) => {///updateCredit/:id
    let userID = req.params.id;
    const { amount } = req.body;
    try {
        if (amount < 0)
            return res.status(200).send('credit should be positive')
        let user = await usersModel.findOneAndUpdate({ "userID": userID }, { $inc: { "details.credit": amount } })
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
        const users = await usersModel.find({ "details.isActive": true })
        if (!users)
            return res.status(200).send('no active users')
        return res.status(200).send(users)
    }
    catch (err) {
        return res.status(200).send(err)
    }
}


const getUsersByCashRange = async (req, res) => {
    const { from, to } = req.params
    try {
        const users = await usersModel.find({ 'details.cash': { $gt: from, $lt: to } })
        return res.send(users)
    }
    catch (err) {
        return res.status(200).send(err)
    }
}

module.exports = {
    createUser,
    getUsers,
    getUserById,
    getActive,
    updateCreditById,
    getUsersByCashRange
}

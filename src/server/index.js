const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require('mongoose');

const app = express();
const userRouter = require('./routes/users.route');
const transactionRouter= require('./routes/transactions.route')
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', userRouter)
app.use('/api/transactions', transactionRouter)
const uri = "mongodb+srv://davidB:1234@bank.mnwyt.mongodb.net/bankDB?retryWrites=true&w=majority";
//connect to db with mongoose
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log("database connected")
});

app.listen(process.env.PORT || 5000, () => {
    console.log(`application start at ${process.env.PORT || 5000}`)
})


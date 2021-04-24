const express = require("express");
const transactionsController = require("../controllers/transactions.controller");
const router = express.Router();

router
	.get("/", transactionsController.getTransactions)
	.get("/getUserTransactionsById/:id", transactionsController.getTransactionsById)
	.put("/deposit/:id", transactionsController.depositCashById)
	.put("/withdraw/:id", transactionsController.withdrawCashById)
	.put("/transferCash", transactionsController.transferCash);

module.exports = router;
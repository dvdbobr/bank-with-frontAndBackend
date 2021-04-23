const express = require("express");
const transactionsController = require("../controllers/transactions.controller");
const router = express.Router();

router
	.get("/", transactionsController.getTransactions)
	.put("/deposit/:id", transactionsController.depositCashById)
	// .put("/update-credit/:id", transactionsController.updateCredit);

module.exports = router;
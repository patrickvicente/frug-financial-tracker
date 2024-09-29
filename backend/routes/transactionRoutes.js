const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// Route for creating a new transaction
router.post('/', transactionController.createTransaction);

// Route for fetching all transactions for a user (with optional filters for month, year, etc.)
router.get('/', transactionController.getTransactions);

// Route for fetching a specific transaction by ID
router.get('/:transaction_id', transactionController.getTransactionById);

// Route for updating a transaction
router.put('/:transaction_id', transactionController.updateTransaction);

// Route for deleting a transaction
router.delete('/:transaction_id', transactionController.deleteTransaction);

module.exports = router;
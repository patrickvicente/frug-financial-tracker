const express = require('express');
const { isAuthorized } = require('../middleware/authMiddleware');
const router = express.Router();
const accountRoutes = require('./accountRoutes');
const budgetRoutes = require('./budgetRoutes');
const transactionRoutes = require('./transactionRoutes');


// Mount Account, Budget, Transaction routes under the user route
router.use('/:user_id/accounts', isAuthorized, accountRoutes);
router.use('/:user_id/budgets', isAuthorized, budgetRoutes);
router.use('/:user_id/transactions', isAuthorized, transactionRoutes);

module.exports = router;
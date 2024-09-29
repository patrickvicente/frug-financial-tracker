const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/budgetController');

// FOR TESTING AND DEBUGGING
router.use((req, res, next) => {
    console.log('Params:', req.params);
    next();
});

// Router for creating a budget
router.post('/', budgetController.createBudget);
// Ruter for getting all budgets
router.get('/', budgetController.getBudgets);
// Router for getting budget by ID
router.get('/:budget_id', budgetController.getBudgetById);
// Router for updating budget by ID
router.put('/:budget_id', budgetController.updateBudget);
// Router for deleting budget by ID
router.delete('/:budget_id', budgetController.deleteBudget);

module.exports = router;
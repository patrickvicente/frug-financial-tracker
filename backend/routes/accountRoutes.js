const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

router.use((req, res, next) => {
    console.log('Params:', req.params);
    next();
});
// Route for creating an account
router.post('/', accountController.createAccount);
// Route for fetching all accounts for a user
router.get('/', accountController.getAccounts);
// Router for fetching a specific account ID
router.get('/:account_id', accountController.getAccountById);
// Router for updating account information
router.put('/:account_id', accountController.updateAccount);
// Router for deleting an account from accounts
router.delete('/:account_id', accountController.deleteAccount);

module.exports = router;
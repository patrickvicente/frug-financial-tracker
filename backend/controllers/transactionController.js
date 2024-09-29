const pool = require('../config/db');
const { secureQuery, validateAccount, validateBudget } = require('../helpers/dbHelpers');

// create a new transaction
exports.createTransaction = async (req, res) => {
    const userId = req.user.id;
    const { account_id, budget_id, description, amount, transaction_type, category, transaction_date } = req.body;

    try {
        // validate account ownership and rel on db
        await validateAccount(userId, account_id);
        // if it's an expense, validate the budget
        if (transaction_type === 'expense' && budget_id) {
            await validateBudget(userId, budget_id);
        }
        // Insert the transaction to transaction db
        const result = await pool.query(
            `INSERT INTO transactions (user_id, account_id, budget_id, description, amount, transaction_type, category, transaction_date)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *`,
            [userId, account_id, budget_id, description, amount, transaction_type, category, transaction_date]
        );

        // Update balance in account db of selected account
        let updateAccountQuery = `UPDATE accounts SET current_balance = current_balance + $1 WHERE id = $2 RETURNING *`;
        if (transaction_type === 'expense') {
            updateAccountQuery = `UPDATE accounts SET current_balance = current_balance - $1 WHERE id = $2 RETURNING *`;
        }
        // use secureQuery to inject the query to the right account
        await secureQuery(pool, updateAccountQuery, [amount, account_id], userId);
        
        // update remaining budget only for expense transaction
        if (transaction_type === 'expense' && budget_id) {
            const budgetUpdateQuery = `UPDATE budgets SET remaining_budget = remaining_budget - $1 WHERE id = $2 RETURNING *`;
            await secureQuery(pool, budgetUpdateQuery, [amount, budget_id], userId);
        }
        res.status(201).json({ transaction: result.rows[0], message: 'Transaction successfully added'});
    } catch (error) {
        console.error('Error adding transaction', error);
        res.status(500).json({ error: 'Failed to add transaction' });
    }
};
// Fetch transaction for a user by query parameters
exports.getTransactions = async (req, res) => {
    const userId = req.user.id;
    const { month, year, transaction_type, category } = req.query; // Grabs params from query if any

    try {
        // Base query
        let query = `SELECT * FROM transactions WHERE user_id = $1`;
        const queryParams = [userId]; // init empty params
        // Add month filter if provided
        if (month) {
            // dynamically adds params and length to query
            query += ` AND EXTRACT(MONTH FROM transaction_date) = $${queryParams.length + 1}`;
            queryParams.push(month); // adds to queryParams array
        }
        if (year) {
            query += ` AND EXTRACT(YEAR FROM transaction_date) = $${queryParams.length + 1}`;
            queryParams.push(year);
        }
        if (transaction_type) {
            query += ` AND transaction_type = $${queryParams.length + 1}`;
            queryParams.push(transaction_type);
        }
        if (category) {
            query += ` AND category = $${queryParams.length + 1}`;
            queryParams.push(category);
        }

        query += ` ORDER BY transaction_date DESC`;
        const result = await pool.query(query, queryParams);
        res.status(200).json({ transactions: result.rows });
    } catch (error) {
        console.error('Error fetching trasactions', error);
        res.status(500).json({ error: 'Failed to fetch transactions' });
    }
};

// Fetch Transaction by Id
exports.getTransactionById = async (req, res) => {
    const userId = req.user.id;
    const transactionId = req.params.transaction_id;

    try {
        const query = 'SELECT * FROM transactions WHERE id = $1';
        const params = [transactionId];
        const result = await secureQuery(pool, query, params, userId);
        // Check if no result
        if(result.rows.length === 0) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        // if Transaction is found
        res.status(200).json({ transaction: result.rows[0] });
    } catch (error) {
        console.error('Error fetching transaction', error);
        res.status(500).json({ error: 'Failed to fetch transaction' });
    }
};

// Update transaction
exports.updateTransaction = async (req, res) => {
    const userId = req.user.id;
    const transactionId = req.params.transaction_id;
    const { account_id, budget_id, description, amount, transaction_type, category, transaction_date } = req.body;

    try {
        // validate account ownership and rel on db
        await validateAccount(userId, account_id);
        // validate budget_id if budget_id is provided
        if (budget_id) {
            await validateBudget(userId, budget_id);
        }
        const query = 
            `UPDATE transactions
            SET account_id = $1, budget_id = $2, description = $3, amount = $4, transaction_type = $5, category = $6, transaction_date = $7
            WHERE id = $8
            RETURNING *`;
        const params = [account_id, budget_id, description, amount, transaction_type, category, transaction_date, transactionId];
        const result = await secureQuery(pool, query, params, userId);
        // handles if transaction is not found
        if (result.rows.length === 0 ){
            return res.status(404).json({ error: 'Transaction not found' });
        }
        // retusn success if found and updated
        res.status(200).json({ transaction: result.rows[0], message: 'Transaction successfully updated' });
    } catch (error) {
        console.error('Error updating transaction', error);
        res.status(500).json({ error: 'Failed to update the transaction' });
    }
};

// Delete Transaction
exports.deleteTransaction = async (req, res) => {
    const userId = req.user.id;
    const transactionId = req.params.transaction_id;

    try {
        const query = 'DELETE FROM transactions WHERE id = $1 RETURNING *';
        const params = [transactionId];
        const result = await secureQuery(pool, query, params, userId);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        res.status(200).json({ message: 'Account successfully deleted' });
    } catch (error) {
        console.error('Error in deleting transaction', error);
        res.status(500).jso({ error: 'Failed to delete transaction' });
    }
};

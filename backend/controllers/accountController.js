const pool = require('../config/db');
const { secureQuery } = require('../helpers/dbHelpers');

// create a new account
exports.createAccount = async (req, res) => {
    const userId = req.user.id;
    const { name, type, starting_balance } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO accounts (user_id, name, type, starting_balance, current_balance) 
            VALUES ($1, $2, $3, $4, $4)
            RETURNING *`, // Set current_balance = starting_balance
            [userId, name, type, starting_balance]
        );

        res.status(201).json({ account: result.rows[0], message: 'Account created successfully'});
    } catch (error) {
        console.error('Error creating account', error);
        res.status(500).json({ error: 'Failed to create account' });
    }
};

// Get all accounts for a user
exports.getAccounts = async (req, res) => {
    console.log('req.user:', req.user)
    const userId = req.user.id;
    console.log('user_id', userId);

    try {
        // $1 will be declared using secure query
        const query = `SELECT * FROM accounts ORDER BY current_balance DESC`
        // use helper function to make sure user_id is authorized
        const result = await secureQuery(pool, query, [], userId);
        res.status(200).json({ accounts: result.rows });
    } catch (error) {
        console.error('Error fetching accounts:', error);
        res.status(500).json({ error: 'Failed to fetch accounts' });
    }
};

// Get account by id
exports.getAccountById = async (req, res) => {
    const accountId = req.params.account_id;

    try {
        const query = `SELECT * FROM accounts WHERE id = $1`
        const result = await secureQuery(pool, query, [accountId], req.user.id);
        // checks if no result
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Account not found' });
        }

        res.status(200).json({ account: result.rows[0] })
    } catch (error) {
        console.error('Error fetching account:', error);
        res.status(500).json({ error: 'Failed to fetch account' });
    }
};

// Update an account's details
exports.updateAccount = async (req, res) => {
    const accountId = req.params.account_id;
    const { name, type, current_balance } = req.body;

    try {
        const query = 
            `UPDATE accounts
            SET name = $1, type = $2, current_balance = $3
            WHERE id = $4
            RETURNING *`;
        const params = [name, type, current_balance, accountId];
        const result = await secureQuery(pool, query, params, req.user.id);
        
        // handles if account is not found
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Account not found' });
        }

        res.status(200).json({ account: result.rows[0], message: 'Account successfully updated' });
    } catch (error) {
        console.error('Error updating account:', error);
        res.status(500).json({ error: 'Failed to update the account' });
    }
};

// Delete an account row from database
exports.deleteAccount = async (req, res) => {
    const accountId  = req.params.account_id;

    try {
        const query = `DELETE FROM accounts WHERE id = $1 RETURNING *`;
        const params =  [accountId]
        const result = await secureQuery(pool, query, params, req.user.id);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Account not found' });
        }

        res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
        console.error('Error deleting account:', error);
        res.status(500).json({ error: 'Failed to delete account' });
    }
};
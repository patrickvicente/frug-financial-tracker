const pool = require('../config/db');

// Helper to inject user_id in req.user to queries
const secureQuery = async (pool, query, params = [], userId) => {
    try {
        // Split the query into parts to correctly append conditions
        const queryParts = query.split(/(ORDER BY|LIMIT|GROUP BY|RETURNING)/i);
        const mainQuery = queryParts[0];
        const remainingQuery = queryParts.slice(1).join(' ');

        // Check if the main query already contains a WHERE clause
        const hasWhereClause = mainQuery.toLowerCase().includes('where');
        const conjunction = hasWhereClause ? 'AND' : 'WHERE';

        // Construct the final secure query
        const secureQuery = `${mainQuery} ${conjunction} user_id = $${params.length + 1} ${remainingQuery}`;

        // Updated: append the userId to the params array correctly
        const finalParams = [...params, userId];

        // Log the query for debugging purposes
        console.log(`Executing secure query: ${secureQuery} with params: [${finalParams}]`);

        // Execute the secure query with correctly appended userId
        return await pool.query(secureQuery, finalParams);
    } catch (error) {
        console.error('Error executing secure query:', error);
        throw error; // Propagate error to the caller
    }
};

// Check if account exists and belong to the user
const validateAccount = async (userId, accountId) => {
    try {
        // Queries accountId with userId
        const result = await pool.query('SELECT * FROM accounts WHERE id = $1 AND user_id = $2', [accountId, userId]);
        // if no account found hanldes the error
        if (result.rows.length === 0) {
            throw new Error('Invalid account ID or account does not belong to the user');
        }
        return result.rows[0]; // return account details if needed
    } catch (error) {
        console.error('Error while fetching account', error);
        throw Error;
    }
};

// Check if budget exist and belong to the user
const validateBudget = async(userId, budgetId) => {
    try {
        // Queries budgets with budgetId and user ID
        const result = await pool.query('SELECT * FROM budgets where id = $1 AND user_id = $2', [budgetId, userId]);
        // check if result is found then handles error
        if (result.rows.length === 0) {
            throw new Error('Invalid budget ID or account does not belong to the user');
        }
        return result.rows[0]; // return budget details if needed
    } catch (error) {
        console.error('Error while fetching budget', error);
        throw Error;
    }
}

module.exports = {
    secureQuery,
    validateAccount,
    validateBudget
};
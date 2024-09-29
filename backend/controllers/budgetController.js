const pool = require('../config/db');
const { secureQuery } = require('../helpers/dbHelpers');

// Create a new budget
exports.createBudget = async (req, res) => {
    const user_id =  req.user.id;
    const { category, allocated_budget, year_month } = req.body;
    const formattedDate = `${year_month}-01` // converst year_month to 2024-09-01
    try {
        const result = await pool.query(
        `INSERT INTO budgets (user_id, category, allocated_budget, year_month)
        VALUES ($1, $2, $3, $4) RETURNING *`, // Set remaining_budget as 0
        [user_id, category, allocated_budget, formattedDate]
        );

        res.status(201).json({ account: result.rows[0], message: 'Budget created successfully'});
    } catch (error) {
        console.error('Error creating budget', error);
        res.status(500).json({ error: 'Failed to create budget' });
    }
};

// Get all budgets for a user
exports.getBudgets = async (req, res) => {
    const userId = req.user.id;

    try {
        // query using secureQuery helper fn
        const query = `SELECT * FROM budgets ORDER BY year_month DESC`;
        // secureQuery will inject secure handlers to query
        const result = await secureQuery(pool, query, [], userId);
        res.status(200).json({ budgets: result.rows });
    } catch (error) {
        console.error('Error fetching budgets', error);
        res.status(500).json({ error: 'Failed to fetch budgets' });
    }
};

// get a budget by id for a user
exports.getBudgetById = async (req, res) => {
    const budgetId = req.params.budget_id;
    const userId = req.user.id;

    try {
        const query = `SELECT * FROM budgets WHERE id = $1`;
        const params = [budgetId];
        const result = await secureQuery(pool,  query, params, userId);
        // checks if no result found 
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Budget not found'});
        }
        // hanlde when budget is found
        res.status(200).json({ account: result.rows[0] });
    } catch (error) {
        console.error('Error fetching budget', error);
        res.status(500).json({ error: 'Failed to fetch budget'});
    }
};
// Updating a budget instance
exports.updateBudget = async (req, res) => {
    const userId  = req.user.id;
    const budgetId = req.params.budget_id;
    const { category, allocated_budget, remaining_budget, year_month } = req.body;
    const formattedDate = `${year_month}-01` // converst year_month to 2024-09-01
    
    try {
        const query =
                `UPDATE budgets
                SET category = $1, allocated_budget = $2, remaining_budget = $3, year_month = $4
                WHERE id = $5
                RETURNING *`;
        const params = [category, allocated_budget, remaining_budget, formattedDate, budgetId];
        const result = await secureQuery(pool, query, params, userId);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Budget not found'});
        }

        res.status(200).json({ account: result.rows[0], message: 'Budget successfully updated'});
    } catch (error) {
        console.error('Error updating budget:', error);
        res.status(500).json({ error: 'Failed to update budget' });
    }
};
// Delete a budget
exports.deleteBudget = async (req, res) => {
    const userId = req.user.id;
    const budgetId = req.params.budget_id;

    try {
        const query  = `DELETE FROM budgets WHERE id = $1 RETURNING *`;
        const params = [budgetId];
        const result = await secureQuery(pool, query, params, userId);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Budget not found' });
        }
        res.status(200).json({ message: 'Budget successfully deleted' });
    } catch (error) {
        console.error('Error deleting budget:', error);
        res.status(500).json({ error: 'Failed to delete budget' });
    }
};
// helpers/dbHelpers.js
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

module.exports = secureQuery;
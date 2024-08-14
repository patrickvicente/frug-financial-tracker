// Select all Transactions
export const selectAllTransactions = (state) => {
    const { byId, allIds } = state.transactions;
    console.log('Transactions State:', state);

    if (!state || typeof state !== 'object') {
        console.error('transactionsState is not an object');
        return [];
      };

    
    
      // Log specific properties
    console.log('byId:', byId);
    console.log('allIds:', allIds);

    if (!allIds || !Array.isArray(allIds)) {
    console.error('allIds is not an array or is undefined');
    return [];
    }

    return allIds.map(id => byId[id]);
};

export const selectTransactionsByMonth = (state, month, year) => {
    return Object.values(selectAllTransactions(state)).filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return transactionDate.getMonth() === month && transactionDate.getFullYear() === year;
    });
};

// Select a transaction by id

//  Select Transactions by type
// selectors.js

export const selectTransactionsByType = (state, type) => {
    if (!state || !state.transactions || !state.transactions.byId) {
        return [];
    }
    return Object.values(state.transactions.byId).filter(transaction => transaction.type === type);
};

export const selectAllTotals = (state) => {
    // Checks if the state is not empty
    if (!state || !state.transactions) return {};

    const totals = {income: 0, expenses: 0} // Init empty totals Object
    
    // Maps through all the IDs and updates the totals object
    state.transactions.allIds.map((id) => {
        const transaction = state.transactions.byId[id];
        if (transaction.type === "income") {
            totals.income += transaction.amount;
        } else {
            totals.expenses += transaction.amount;
        }
    });
    totals.balance = totals.income;
    return totals;
};

export const selectTotalsByMonth = (state) => {
    // Checks if the state is not empty
    if (!state || !state.transactions) return {};
    
    const transactions = state.transactions.byId;
    const totals = {}; // Init totals Object
    // Maps through the transactions
    Object.values(transactions).forEach((transaction) => {
        const monthYear = new Date(transaction.date).toLocaleString("default", {month: "short", year: "numeric"});
        // Creates a new monthYear key, value if not yet present
        if (!totals[monthYear]) {
            totals[monthYear] = {income: 0, expenses: 0, balance: 0};
        }
        // updates the totals based on type
        if (transaction.type === "income") {
            totals[monthYear].income += transaction.amount;
        } else {
            totals[monthYear].expenses += transaction.amount;
        }
        // deducts expenses from income in totals
        totals[monthYear].balance = totals[monthYear].income - totals[monthYear].expenses
    });

    return totals;
};


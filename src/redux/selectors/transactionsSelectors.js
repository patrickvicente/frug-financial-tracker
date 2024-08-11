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
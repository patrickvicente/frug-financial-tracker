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

export const selectTransactionsByMonth = (state, month) => {
    if (state.budgets.byMonth[month]) {
        return Object.values(state.budgets.byMonth[month].categories).flatMap(category => category.transactions);
    }
    return null;
};

// Select a transaction by id

//  Select Transactions by type


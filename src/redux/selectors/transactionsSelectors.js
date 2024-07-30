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

// Select a transaction by id

//  Select Transactions by type


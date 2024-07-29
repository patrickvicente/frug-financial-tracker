// Select all Transactions
export const selectAllTransactions = (state) => {
    const { byId, allIds } = state.transactions;
    if (!allIds || !byId ) {
        return [];
    }

    return state.transactions.allIds.map(id => {
        return state.transactions.byId[id]
    });
};

// Select a transaction by id

//  Select Transactions by type


import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ac1: {
        name: "spending",
        type: "spending", // spending, savings, investment, credit, loan
        startingBalance: 0,
        currentBalance: 0,
        transactionIds: [],
    },
    ac2: {
        name: "nab",
        type: "credit", // spending, savings, investment, credit, loan
        startingBalance: 0,
        currentBalance: 0,
        transactionIds: [],
    },
};

const accountsSlice = createSlice({
    name: "accounts",
    initialState,
    reducers: {
        addAccount: (state, action) => {
            const { id, name, type, startingBalance} = action.payload;
            if (!id || !name || !type || isNaN(startingBalance)) {
                console.error("Invalid account data");
                return
            }
            state[id] = {
                name: name.toLowerCase(), 
                type, 
                startingBalance, 
                currentBalance: startingBalance, 
                transactionIds: []
            }
        },
        editAccount: (state, action) => {
            const { id, name, type } = action.payload;
            // check if the id is valid then update
            if (!state[id]) {
                console.error(`Account with ID ${id} does not exist`);
                return;
            }
            state[id].name = name;
            state[id].type = type;
        },
        transferAmount: (state, action) => {
            const { fromAccountId, toAccountId, amount } = action.payload;
            if (!state[fromAccountId] || !state[toAccountId]) {
                 throw new Error("Invalid account IDs provided for transfer");
            }
            const fromAccount = state[fromAccountId];
            const toAccount = state[toAccountId];
            // Check if the amount is available from the account
            if (fromAccount.currentBalance < amount && fromAccount.type !== "credit" && fromAccount.type !== "loan" ) {
                console.error("Insufficient funds for transfer");
                return;
            }
            fromAccount.currentBalance -= amount;   // deduct amount from the outgoing account
            toAccount.currentBalance += amount;     // add amount to ongoing account   
        },
        addAccountsTransaction: (state, action) => {
            const { id, transaction } = action.payload;
            // check if id object exist
            if (!state[id]) {
                console.error(`Account with ID ${id} does not exist`);
                return;
            }
            // check if it transaction income or expense
            if (transaction.type.toLowerCase() === "expense") {
                state[id].currentBalance -= transaction.amount;
            } else {
                state[id].currentBalance += transaction.amount;
            }
            state[id].transactionIds.push(transaction.id);
            
        },
    }
});

export const { addAccount, editAccount, transferAmount, addAccountsTransaction } = accountsSlice.actions;
export default accountsSlice.reducer;
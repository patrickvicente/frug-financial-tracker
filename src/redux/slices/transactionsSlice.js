import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    transactions: {
       byId: {},
       allIds: []       
    },
    status: "idle",
    error: null
};


const transactionsSlice = createSlice({
    name: "transactions",
    initialState, 
    reducers: {
        addTransaction: (state, action) => {
            const { id } = action.payload
            
            state.transactions.byId[id] = action.payload;
            state.transactions.allIds.push(id);
        },
    },
});

//  Select transactions by type
export const { addTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;
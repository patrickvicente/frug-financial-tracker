import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    byId: {
      1: {
        type: "income",
        description: "ECA - Salary",
        date: "July 7, 2024",
        amount: 1521.25,
        category: "Salary",
      }
    },
    allIds: [1]
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      const { id } = action.payload;
      console.log("Action Payload: ", action.payload)
      console.log('State before update:', JSON.parse(JSON.stringify(state)));
      
      state.byId[id] = action.payload;
      state.allIds.push(id);
      
      console.log('State after update:', JSON.parse(JSON.stringify(state)));
    },
  },
});

export const { addTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;
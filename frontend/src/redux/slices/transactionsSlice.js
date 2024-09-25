import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    byId: {
      1000: {
        type: "income",
        description: "ECA - Salary",
        date: "July 1, 2024",
        amount: 0,
        category: "Salary",
      }
    },
    allIds: [1000]
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
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    byCategory: {
        clothing: {
            category: "clothing",
            budget: 1000,
            total: 1500,
        }
    },
};

const budgetsSlice = createSlice({
    name: "budgets",
    initialState,
    reducers: {
        addBudget: (state, action) => {
            const { category, budget } = action.payload;

            if (category in state.byCategory || budget < 0) {
                // need to check how to handle this
                return null;
            } else {
                state.byCategory[category] = {
                    category: category,
                    budget: budget, 
                    total: 0};
            };
        },
        editBudget: (state, action) => {
            const { category, budget } = action.payload;
            state.byCategory[category].budget = budget;

            // TO DO Implement Change name of category
        },
        addBudgetTransaction: (state, action) => {
            const { category, amount } = action.payload;
            if (category in state.byCategory || amount >= 0) {
                state.byCategory[category].total += amount;
            }
        },
    }
});

export const { addBudget, editBudget, addBudgetTransaction } = budgetsSlice.actions;
export default budgetsSlice.reducer;

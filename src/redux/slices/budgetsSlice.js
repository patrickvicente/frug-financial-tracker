import { createSlice } from "@reduxjs/toolkit";
import transactionsSlice from "./transactionsSlice";

const initialState = {
    byCategory: {
        clothing: {
            category: "clothing",
            budget: 1000,
            total: 1500,
            transactions: [],
        }
    },
    byMonth: {
        total: 0,
        /*
            total: 0,
            "August 2024": {
                budget: 0,
                total: 0,
                transactions: []
            }, 
        */
    },
};

const budgetsSlice = createSlice({
    name: "budgets",
    initialState,
    reducers: {
        addBudget: (state, action) => {
            const { category, budget } = action.payload;

            if (!state.byCategory[category] && budget >= 0) {
                state.byCategory[category] = {
                    category,
                    budget,
                    total: 0,
                    transactions: []
                };
            }
        },
        editBudget: (state, action) => {
            const { category, budget } = action.payload;
            if (state.byCategory[category]) {
                state.byCategory[category].budget = budget;    
            }
            
            // TO DO Implement Change name of category
        },
        addBudgetTransaction: (state, action) => {
            const { category, amount, date, type } = action.payload;
            const month = new Date(date).toLocaleString("default", {month: "long", year: "numeric"});

            if (!state.byMonth[month]) {
                // Creates an object if new month
                state.byMonth[month] = { categories: {}}
            };

            if (type === "income") {
                category = "income";
            };

            if (!state.byMonth[month].categories[category]) {
                // Creates a category object if new object
                state.byMonth[month].categories[category] = { budget: 0, total: 0, transactions: []};
            };

            if (!state.byCategory[category]) {
                // create a new category object in the byCategory
                state.byCategory[category] = {category, budget: 0, total: 0, transactions: []};
            }

            state.byCategory[category].transactions.push(action.payload);
            state.byCategory[category].total += amount;
            
            state.byMonth[month].categories[category].transactions.push(action.payload);
            state.byMonth[month].categories[category].total += amount;


            console.log("Budget state", state);
        },
    }
});

export const { addBudget, editBudget, addBudgetTransaction } = budgetsSlice.actions;
export default budgetsSlice.reducer;

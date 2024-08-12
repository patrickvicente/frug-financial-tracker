import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    byCategory: {
        clothing: {
            category: "clothing",
            type: "expense",
            budget: 1000,
            totalSpent: 1500,
            transactionIds: [],
        }
    },
    byMonth: {
        "2024-08": {
            totalBudget: 5000, // Total budget for the month
            totalSpent: 1500, // Total spent across all categories for the month
            remaining: 3500, // Remaining budget for the month
            categories: {
                clothing: {
                    type: "expense", // Could be 'expense' or 'income'
                    budget: 1000, // Budget allocated for this category
                    totalSpent: 500, // Total spent in this category
                    remaining: 500, // Remaining budget for this category
                    transactionIds: [],
                },
                groceries: {
                    type: "expense",
                    budget: 1500,
                    totalSpent: 1000,
                    remaining: 500,
                    transactionIds: [],
                },
            },
        },
    },
};

const budgetsSlice = createSlice({
    name: "budgets",
    initialState,
    reducers: {
        addBudget: (state, action) => {
            const { monthYear, category, budget, type } = action.payload;

            if (!state.byCategory[category] && budget >= 0) {
                state.byCategory[category] = {
                    category,
                    type,
                    budget,
                    totalSpent: 0,
                    transactionIds: []
                };
            }

            // Ensure the monthYear exists in the byMonth
            if (!state.byMonth[monthYear]) {
                state.byMonth[monthYear] = {
                    totalBudget: 0,
                    totalSpent: 0,
                    remaining: 0,
                    categories: {}
                };
            }

            if (!state.byMonth[monthYear].categories[category]) {
                state.byMonth[monthYear].categories[category] = { type, budget, totalSpent: 0, transactionIds: []};
                
                if (type === "income") {
                    state.byMonth[monthYear].remaining += budget; // Adds income to remaining amount
                } else {
                    state.byMonth[monthYear].totalBudget += budget; // add the budget to totalBudget
                    state.byMonth[monthYear].remaining -= budget; // updates the remaining amount
                }
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
            }

            if (!state.byMonth[month].categories[category]) {
                // Creates a category object if new object
                state.byMonth[month].categories[category] = {type,  budget: 0, totalSpent: 0, transactionIds: [] };
            }
            // Ensure the category is initialized in byCategory
            if (!state.byCategory[category]) {
                state.byCategory[category] = { type, category, budget: 0, totalSpent: 0, transactionIds: [] };
            }

            // Update transactions and totals
            state.byCategory[category].transactionIds.push(action.payload.id);
            state.byCategory[category].totalSpent += amount;

            state.byMonth[month].categories[category].transactionIds.push(action.payload.id);
            state.byMonth[month].categories[category].totalSpent += amount;
        },
    }
});

export const { addBudget, editBudget, addBudgetTransaction } = budgetsSlice.actions;
export default budgetsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    byCategory: {
        clothing: {
            category: "clothing",
            type: "expense",
            budget: 0,
            totalSpent: 0,
            transactionIds: [],
        }
    },
    byMonth: {
        "2024-08": {
            totalBudget: 0, // Total budget for the month
            totalSpent: 0, // Total spent across all categories for the month
            remaining: 0, // Remaining budget for the month
            categories: {
                clothing: {
                    type: "expense", // Could be 'expense' or 'income'
                    budget: 0, // Budget allocated for this category
                    totalSpent: 0, // Total spent in this category
                    remaining: 0, // Remaining budget for this category
                    transactionIds: [],
                },
                grocery: {
                    type: "expense",
                    budget: 0,
                    totalSpent: 0,
                    remaining: 0,
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
            const formatCategory = category.toLowerCase(); // formats the category

            // Checks if category exists if not, creates a new object
            if (!state.byCategory[formatCategory] && budget >= 0) {
                state.byCategory[formatCategory] = {
                    formatCategory,
                    type,
                    budget,
                    totalSpent: 0,
                    transactionIds: []
                };
            } else {
                // updated the total budget of the category if it exists
                state.byCategory[formatCategory].budget += budget;
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

            if (!state.byMonth[monthYear].categories[formatCategory]) {
                state.byMonth[monthYear].categories[formatCategory] = { type, budget, totalSpent: 0, transactionIds: []};
                
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
            const dateObj = new Date(date);
            const year = dateObj.getFullYear();
            const month = ("0" + (dateObj.getMonth() + 1)).slice(-2); // Ensures two digits
            const yearMonth = `${year}-${month}`;
            const formattedCategory = category.toLowerCase();


            if (!state.byMonth[yearMonth]) {
                // Creates an object if new month
                state.byMonth[yearMonth] = { categories: {}}
            }

            if (!state.byMonth[yearMonth].categories[formattedCategory]) {
                // Creates a category object if new object
                state.byMonth[yearMonth].categories[formattedCategory] = {type,  budget: 0, totalSpent: 0, transactionIds: [] };
            }
            // Ensure the category is initialized in byCategory
            if (!state.byCategory[formattedCategory]) {
                state.byCategory[formattedCategory] = { type, formattedCategory, budget: 0, totalSpent: 0, transactionIds: [] };
            }

            // Update transactions and totals
            state.byCategory[formattedCategory].transactionIds.push(action.payload.id);
            state.byCategory[formattedCategory].totalSpent += amount;

            state.byMonth[yearMonth].categories[formattedCategory].transactionIds.push(action.payload.id);
            state.byMonth[yearMonth].categories[formattedCategory].totalSpent += amount;
        },
    }
});

export const { addBudget, editBudget, addBudgetTransaction } = budgetsSlice.actions;
export default budgetsSlice.reducer;

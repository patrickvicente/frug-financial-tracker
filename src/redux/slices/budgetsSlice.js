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
            console.log("Add Budget Slice", action.payload);
            const { monthYear, category, budget, type } = action.payload;
            const formatCategory = category.toLowerCase(); // formats the category

            // initializes category if it doesn't exist yet
            if (!state.byCategory[formatCategory]) {
                state.byCategory[formatCategory] = {
                    formatCategory,
                    type,
                    budget,
                    totalSpent: 0,
                    transactionIds: []
                }
            } else {
                // Update the budget for existing category
                state.byCategory[formatCategory].budget += budget;
            }
            
            // Initialize monthYear if it doesn't exist
            if (!state.byMonth[monthYear]) {
                state.byMonth[monthYear] = {
                    totalBudget: 0,
                    totalSpent: 0,
                    remaining: 0, 
                    categories: {}
                };
            }
            // Initialize or update the category within the monthYear
            if (!state.byMonth[monthYear].categories[formatCategory]) {
                state.byMonth[monthYear].categories[formatCategory] = { 
                    type,
                    budget,
                    remaining: budget,
                    totalSpent: 0, 
                    transactionIds: []
                };

                // Adjust totalBudget and remaining for the new category
                if (type === "income") {
                    state.byMonth[monthYear].remaining += budget;
                } else {
                    state.byMonth[monthYear].totalBudget += budget;
                    state.byMonth[monthYear].remaining -= budget;
                }
            } else {
                // If category already exists in the monthYear, update the budget
                const existingCategory = state.byMonth[monthYear].categories[formatCategory];
                
                // Update the category budget
                existingCategory.budget += budget;

                // Recalculate the remaining amount for this category
                existingCategory.remaining = existingCategory.budget - existingCategory.totalSpent;

                // Adjust totalBudget and remaining based on the updated budget
                if (type === "income") {
                    // Adjust remaining for income categories
                    state.byMonth[monthYear].remaining += budget;
                } else {
                    // Adjust totalBudget and remaining for expense categories
                    state.byMonth[monthYear].totalBudget += budget;
                    state.byMonth[monthYear].remaining = state.byMonth[monthYear].totalBudget - state.byMonth[monthYear].totalSpent;
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
                state.byMonth[yearMonth] = { totalBudget: 0, totalSpent: 0, remaining: 0, categories: {}}
            }

            if (!state.byMonth[yearMonth].categories[formattedCategory]) {
                // Creates a category object if new object
                state.byMonth[yearMonth].categories[formattedCategory] = {type,  budget: 0, totalSpent: 0, remaining: 0, transactionIds: [] };
            }
            // Ensure the category is initialized in byCategory
            if (!state.byCategory[formattedCategory]) {
                state.byCategory[formattedCategory] = { type, formattedCategory, budget: 0, totalSpent: 0, transactionIds: [] };
            }

            // Update transactions and totals
            state.byCategory[formattedCategory].transactionIds.push(action.payload.id);
            state.byCategory[formattedCategory].totalSpent += amount;

            // Update the total spent and transaction IDs in the monthly category
            state.byMonth[yearMonth].categories[formattedCategory].totalSpent += amount;
            state.byMonth[yearMonth].categories[formattedCategory].transactionIds.push(action.payload.id);

            // Update remaining budget for the category in that month
            const monthlyBudget = state.byMonth[yearMonth].categories[formattedCategory].budget;
            state.byMonth[yearMonth].categories[formattedCategory].remaining = monthlyBudget - state.byMonth[yearMonth].categories[formattedCategory].totalSpent;

            // Update the overall total spent for the month
            state.byMonth[yearMonth].totalSpent += amount;

            
        },
    }
});

export const { addBudget, editBudget, addBudgetTransaction } = budgetsSlice.actions;
export default budgetsSlice.reducer;

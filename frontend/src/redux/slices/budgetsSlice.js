import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    byCategory: {
        clothing: {
            category: "clothing",
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
                    budget: 0, // Budget allocated for this category
                    totalSpent: 0, // Total spent in this category
                    remaining: 0, // Remaining budget for this category
                    transactionIds: [],
                },
                grocery: {
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
            const { monthYear, category, budget } = action.payload;
            const formattedCategory = category.toLowerCase(); // formats the category

            // initializes category if it doesn't exist yet
            if (!state.byCategory[formattedCategory]) {
                state.byCategory[formattedCategory] = {
                    category: formattedCategory,
                    budget,
                    totalSpent: 0,
                    transactionIds: []
                }
            } else {
                // Update the budget for existing category
                state.byCategory[formattedCategory].budget += budget;
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
            if (!state.byMonth[monthYear].categories[formattedCategory]) {
                state.byMonth[monthYear].categories[formattedCategory] = { 
                    budget,
                    remaining: budget,
                    totalSpent: 0, 
                    transactionIds: []
                }
            } else {
                // If category already exists in the monthYear, update the budget
                const existingCategory = state.byMonth[monthYear].categories[formattedCategory];
                // Update the category budget
                existingCategory.budget += budget;
                // Recalculate the remaining amount for this category
                existingCategory.remaining = existingCategory.budget - existingCategory.totalSpent;
            }
            // Adjust totalBudget and remaining for expense categories
            state.byMonth[monthYear].totalBudget += budget;
            state.byMonth[monthYear].remaining = state.byMonth[monthYear].totalBudget - state.byMonth[monthYear].totalSpent;
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
            if (type === "expense") {
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
                    state.byMonth[yearMonth].categories[formattedCategory] = { budget: 0, totalSpent: 0, remaining: 0, transactionIds: [] };
                }
                // Ensure the category is initialized in byCategory
                if (!state.byCategory[formattedCategory]) {
                    state.byCategory[formattedCategory] = {formattedCategory, budget: 0, totalSpent: 0, transactionIds: [] };
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
                state.byMonth[yearMonth].remaining = state.byMonth[yearMonth].totalBudget - state.byMonth[yearMonth].totalSpent;
            }
        },
    },
});

export const { addBudget, editBudget, addBudgetTransaction } = budgetsSlice.actions;
export default budgetsSlice.reducer;

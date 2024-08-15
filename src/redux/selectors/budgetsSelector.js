import { type } from "@testing-library/user-event/dist/type";
import { createSelector } from "reselect";

// Select all budgets
 export const selectAllBudgets = (state) => {
    if (!state || !state.budgets || !state.budgets.byCategory) {
        return [];
    }

    const { byCategory } = state.budgets
    return Object.values(byCategory);
 };

 export const selectBudgetCategories = (state) => {
    if (!state) {
        return [];
    }

    const { byCategory } = state.budgets
    return Object.keys(byCategory);
 };

 export const selectBudgetCategoriesByMonth = (state, monthYear) => {
    return Object.keys(state.budgets.byMonth?.[monthYear]?.categories ?? {});
 };

 export const selectBudgetsByMonth = (state) => {
   return state.budgets.byMonth;
 };
 
// Extracts all budgets with totalSpent
export const selectAllBudgetCategories = createSelector(
   // checks if state is not null, return empty if null
   state => state.budgets?.byCategory || {},
   byCategory => {
      // Maps through the keys and creates an array of objects
      const categories = Object.keys(byCategory).map(categoryName => ({
         category: categoryName,
         type: byCategory[categoryName].type,
         totalSpent: byCategory[categoryName].totalSpent 
      }));
      return categories;
   }
);

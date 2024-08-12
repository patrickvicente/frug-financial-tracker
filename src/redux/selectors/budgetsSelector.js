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

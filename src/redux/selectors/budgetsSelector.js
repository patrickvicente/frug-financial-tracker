// Select all budgets
 export const selectAllBudgets = (state) => {
    if (!state) {
        return [];
    }

    const { byCategory } = state.budgets;
    const selectedBudget = Object.keys(byCategory).map( category => byCategory[category]);
    console.log("Selector", selectedBudget);
    return selectedBudget
 };

 export const selectBudgetCategories = (state) => {
    if (!state) {
        return [];
    }

    const { byCategory } = state.budgets
    return Object.keys(byCategory);

 };


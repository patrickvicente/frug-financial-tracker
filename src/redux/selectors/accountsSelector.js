import { createSelector } from "reselect";

const selectAccountsState = (state) => state.accounts;

// selects all accounts
export const selectAllAccounts = createSelector(
    [selectAccountsState],
    (accounts) => accounts ? Object.values(accounts) : []
);

export const selectAccountById = (state, id) => state.accounts?.[id];

export const selectAccountsByType = (state, type) => {
    if (!state || !state.accounts) {
        console.error("No account Found");
        return [];
    }

   return state.accounts.filter((account) => account.type === type);
};

export const selectTotalBalance = createSelector(
    [selectAccountsState], 
    (accounts) => {
        return Object.values(accounts).reduce((total, account) => {
            return total + account.currentBalance;
        }, 0);
    }
);

export const selectAccountsForDropdown = createSelector(
    [selectAccountsState],
    (accounts) => Object.entries(accounts).map(([key, value]) => ({
        id: key,
        name: value.name
    }))
);
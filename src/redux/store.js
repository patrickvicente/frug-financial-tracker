import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer from './slices/transactionsSlice';
import budgetsSlice from './slices/budgetsSlice';
import accountsSlice from './slices/accountsSlice';

const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    budgets: budgetsSlice,
    accounts: accountsSlice
  },
});

export default store;
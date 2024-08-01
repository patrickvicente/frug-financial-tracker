import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer from './slices/transactionsSlice';
import budgetsSlice from './slices/budgetsSlice';

const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    budgets: budgetsSlice
  },
});

export default store;
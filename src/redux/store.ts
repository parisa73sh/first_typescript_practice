import { configureStore } from '@reduxjs/toolkit';
import transactionReducer from './reducers/Reducers';
import  userReducer  from './reducers/userSlice';

const store = configureStore({
  reducer: {
    transactions: transactionReducer,
    user: userReducer,
  },
});
store.subscribe(() => {
  const { transactions, categories , users } = store.getState().transactions;
  sessionStorage.setItem('transactions', JSON.stringify(transactions));
  sessionStorage.setItem('categories', JSON.stringify(categories));
  localStorage.setItem('user', JSON.stringify(users));
});
export type RootState = ReturnType<typeof store.getState>;
export default store;

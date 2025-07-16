import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface itransactions {
  id: number;
  Title: string;
  Amount: number;
  Category: string | string[];
  Date: string;
  Type: string;
}

interface istoredusers {
  name: string;
  email: string;
  password: string;
  cardnumber: number;
}

interface reducerstate {
  transactions: itransactions[];
  categories: string[];
  users: istoredusers[];
}

// Helpers
const storedTransactions = (key: string): itransactions[] => {
  try {
    const parsed = sessionStorage.getItem(key);
    return parsed ? JSON.parse(parsed) : [];
  } catch {
    return [];
  }
};

const storedCategories = (key: string): string[] => {
  const defaultCategories = ["خوراک", "حمل و نقل", "تفریح"];
  try {
    const newitem = sessionStorage.getItem(key);
    return newitem ? JSON.parse(newitem) : defaultCategories;
  } catch {
    return defaultCategories;
  }
};

const storedusers = (key: string): istoredusers[] => {
  try {
    const parsed = sessionStorage.getItem(key);
    return parsed ? JSON.parse(parsed) : [];
  } catch {
    return [];
  }
};

const initialState: reducerstate = {
  transactions: storedTransactions('transactions'),
  categories: storedCategories('categories'),
  users: storedusers('Users'),
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<itransactions>) => {
      state.transactions.unshift(action.payload);
      sessionStorage.setItem('transactions', JSON.stringify(state.transactions));
    },
    deleteTransaction: (state, action: PayloadAction<Number>) => {
      state.transactions = state.transactions.filter(c => c.id !== action.payload);
      sessionStorage.setItem('transactions', JSON.stringify(state.transactions));
    },
    addCategory: (state, action: PayloadAction<string>) => {
      state.categories.push(action.payload);
      sessionStorage.setItem('categories', JSON.stringify(state.categories));
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter(c => c !== action.payload);
      sessionStorage.setItem('categories', JSON.stringify(state.categories));
    },
  },
});

export const { addTransaction, deleteTransaction, addCategory, deleteCategory } = transactionSlice.actions;
export default transactionSlice.reducer;

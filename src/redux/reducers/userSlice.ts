import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  name: string;
  email: string;
  password: string;
  cardNumber: string;
}

interface UserState {
  user: User | null;
  users: User[];
}

const getStoredItem = (key: string): any => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
};

const initialState: UserState = {
  user: getStoredItem('user'),
  users: getStoredItem('Users') || [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    registerUser: (state, action: PayloadAction<User>) => {
      const existing = state.users.find(u => u.email === action.payload.email);
      if (!existing) {
        state.users.push(action.payload);
        localStorage.setItem('Users', JSON.stringify(state.users));
      }
    },
    loginUser: (state, action: PayloadAction<{ email: string; password: string }>) => {
      const user = state.users.find(
        u => u.email === action.payload.email && u.password === action.payload.password
      );
      if (user) {
        state.user = user;
        localStorage.setItem('user', JSON.stringify(user));
      }
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
  },
});

export const { registerUser, loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;

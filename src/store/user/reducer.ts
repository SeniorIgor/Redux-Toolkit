import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User } from "@/models/user";

import { fetchUsers } from "./action-creators";

interface UserState {
  users: User[];
  isLoading?: boolean;
  error?: string;
  count: number;
}

const initialState: UserState = {
  users: [],
  count: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.fulfilled.type]: (
      state,
      action: PayloadAction<Array<User>>
    ) => {
      state.isLoading = false;
      state.error = '';
      state.users = action.payload;
    },
    [fetchUsers.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchUsers.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const actions = userSlice.actions;

export default userSlice.reducer;

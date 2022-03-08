import { RootState } from "@/store/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectUserReducer = (state: RootState) => state.userReducer;

export const selectUsers = createSelector(
  selectUserReducer,
  (state) => state.users
);

export const selectCount = createSelector(
  selectUserReducer,
  (state) => state.count
);

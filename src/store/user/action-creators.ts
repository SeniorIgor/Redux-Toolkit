import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { User } from "@/models/user";

export const fetchUsers = createAsyncThunk(
  'user/fetchAll',
  async (_, thunkApi) => {
    try {
      const response = await axios.get<Array<User>>(
        'https://jsonplaceholder.typicode.com/userss'
      );

      return response.data;
    } catch (err) {
      return thunkApi.rejectWithValue('Error loading users');
    }
  }
);

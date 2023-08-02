/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { auth } from '@/lib/firebase';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword } from 'firebase/auth';

interface IUser {
  user: {
    email: string | null;
  };
  isLoading: boolean;
  isError: boolean;
  error: string | null;
}

interface ICredentials {
  email: string;
  password: string;
}

const initialState: IUser = {
  user: {
    email: null,
  },
  isLoading: false,
  isError: false,
  error: null,
};

export const createUser = createAsyncThunk(
  'user/createUser',
  async ({ email, password }: ICredentials) => {
    const userData = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userData.user.email;
  }
);

const userSlice = createSlice({
  name: 'productFilter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.user.email = action.payload;
      state.isLoading = false;
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.isError = true;
      state.error = action.error.message!;
      state.isLoading = false;
    });
  },
});

export default userSlice.reducer;

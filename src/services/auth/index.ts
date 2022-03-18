import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import * as authApi from './auth.api';
import { User } from './auth.types';

export interface AuthState {
  authenticateError: Boolean | null;
  loginEmail: string | null;
  user?: User;
}

const initialState: AuthState = {
  authenticateError: null,
  loginEmail: null
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(authenticateAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const authenticateAsync = createAsyncThunk(
  'auth/authenticate',
  async ({ email, emailToken }: authApi.LoginPayload) => {
    await authApi.authenticate({ email, emailToken });
    const response = await authApi.getUser();
    return response.data;
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  return authApi.logout();
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    setCurrentEmail(state, action: PayloadAction<string | null>) {
      state.loginEmail = action.payload;
    }
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers(builder) {
    builder.addCase(authenticateAsync.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(authenticateAsync.rejected, (state) => {
      state.authenticateError = true;
    });
  }
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.auth.value)`
export const authSelectors = {
  getAuthenticateError: (state: RootState) => state.auth.authenticateError,
  getUser: (state: RootState) => state.auth.user,
  getLoginEmail: (state: RootState) => state.auth.loginEmail
};

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd = (amount: number): AppThunk => (
// 	dispatch,
// 	getState,
// ) => {
// 	const user = getUser(getState());
// 	if (!user) {
// 		dispatch(incrementByAmount(amount));
// 	}
// };

export const { setCurrentEmail, setUser } = authSlice.actions;
export default authSlice.reducer;
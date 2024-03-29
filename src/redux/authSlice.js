import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { requestRegister, setToken, requestLogin, requestRefreshUser, requestLogout, requestAvatar } from "services/Api";

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (formData, thunkAPI) => {
    try {
      const authData = await requestRegister(formData);
      return authData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (formData, thunkAPI) => {
    try {
      const response = await requestLogin(formData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshThunk = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    try {
      setToken(token);
      const authData = await requestRefreshUser();

      return authData; 
    } catch (error) {
      return ;
    }
  },
  {
    condition: (_, thunkAPI) => {
      const state = thunkAPI.getState();
      const token = state.auth.token;

      if (!token) return false;
      return true;
    },
  }
);

export const logOutThunk = createAsyncThunk(
  'auth/logOut',
  async (_, thunkAPI) => {
    try {
      const { avatarURL } = await requestLogout();

      return avatarURL;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const changeAvatarThunk = createAsyncThunk(
  'auth/users/changeAvatar',
  async (formData, thunkAPI) => {
    try {
     const data = await requestAvatar(formData);
      return data.avatarURL;
    }
    catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const INITIAL_STATE = {
  token: null,
  user: {
    email: null,
    name: null,
    avatarURL: '',
  },
  register: false,
  authenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  
  name: 'auth',
  
  initialState: INITIAL_STATE,
  extraReducers: builder =>
    builder
      // ---------- REGISTER USER ----------------
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.register = true;
        
        state.user = action.payload.user;
      })
      // ---------- LOGIN USER ----------------
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authenticated = true;
        state.register = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      // ---------- REFRESH USER ----------------
      .addCase(refreshThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authenticated = true;
        state.register = true;
        state.user = action.payload;
      })
      // ---------- LOGOUT USER ----------------
      .addCase(logOutThunk.fulfilled, () => {
        return INITIAL_STATE;
      })
      // ---------- CHANGE AVATAR USER ----------------
      .addCase(changeAvatarThunk.fulfilled, (state, action) => {
        state.user.avatarURL = action.payload;
      })



      .addMatcher(
        isAnyOf(
          logOutThunk.pending,
          registerThunk.pending,
          loginThunk.pending,
          refreshThunk.pending
        ),
        state => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(isAnyOf(
        logOutThunk.rejected,
        registerThunk.rejected,
        loginThunk.rejected,
        refreshThunk.rejected
      ),
          (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
          }
      ),
});

export const authReducer = authSlice.reducer;
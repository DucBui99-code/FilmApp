import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import UserServices from '../services/userServices';
import AuthServices from '../services/authServices';

export const fetchNotificationCount = createAsyncThunk(
  'auth/fetchNotificationCount',
  async (_, { getState, rejectWithValue }) => {
    try {
      const response = await UserServices.getCountNotification();
      return response.total;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Failed to fetch notification count'
      );
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await AuthServices.getMyProfile(); // API /auth/me
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Failed to fetch auth status'
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',

  initialState: {
    userId: null,
    isLogin: false,
    loginType: null,
    userInfo: null,
    countNoti: 0,
  },

  reducers: {
    loginSuccess: (state, action) => {
      state.userId = action.payload.userId;
      state.isLogin = true;
      state.loginType = action.payload.loginType;
      localStorage.setItem('access_token', action.payload.token);
    },
    logout: (state) => {
      state.userId = null;
      state.userInfo = null;
      state.isLogin = false;
      state.loginType = '';
      localStorage.removeItem('access_token');
    },

    addCountNoti: (state, action) => {
      state.countNoti++;
    },
    removeCountNoti: (state, action) => {
      state.countNoti--;
    },
    resetCountNoti: (state, action) => {
      state.countNoti = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotificationCount.fulfilled, (state, action) => {
        state.countNoti = action.payload;
      })
      .addCase(fetchNotificationCount.rejected, (state, action) => {
        state.countNoti = 0;
        console.error(
          `Failed to get count notification ${action.meta.arg}:`,
          action.payload
        );
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.userInfo = action.payload.userInfo;
        state.userId = action.payload.userId;
        state.isLogin = true;
        state.loginType = action.payload.loginType;
      })
      .addCase(fetchUserProfile.rejected, (state) => {
        state.isLogin = false;
        state.userInfo = null;
      });
  },
});

export const {
  loginSuccess,
  logout,
  addCountNoti,
  removeCountNoti,
  resetCountNoti,
} = authSlice.actions;
export default authSlice.reducer;

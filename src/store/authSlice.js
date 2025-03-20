import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import UserServices from '../services/userServices';
import movieServices from '../services/movieServices';
import { setPopup } from './appStore';

export const fetchNotificationCount = createAsyncThunk(
  'auth/fetchNotificationCount',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      if (!token) return rejectWithValue('No token found');

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
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token; // Lấy token từ Redux state
      if (!token) return rejectWithValue('No token found');

      const responseUserInfor = await UserServices.getProfile();

      return { userInfo: responseUserInfor.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch profile');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',

  initialState: {
    userId: localStorage.getItem('userId') || null, // Lấy từ LocalStorage
    token: Cookies.get('token') || '',
    isLogin: !!Cookies.get('token'),
    loginType: localStorage.getItem('loginType') || null,
    userInfo: null,
    countNoti: 0,
  },

  reducers: {
    loginSuccess: (state, action) => {
      state.userId = action.payload.userId;
      state.token = action.payload.token;
      state.isLogin = true;
      state.loginType = action.payload.loginType;
      Cookies.set('token', action.payload.token, { expires: 7 }); // Token lưu trong 7 ngày
      localStorage.setItem('userId', action.payload.userId);
      localStorage.setItem('loginType', action.payload.loginType);
    },
    logout: (state) => {
      state.userId = null;
      state.token = '';
      state.userInfo = null;
      state.isLogin = false;
      state.loginType = '';
      Cookies.remove('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('loginType');
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
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.userInfo = action.payload.userInfo;
      })
      .addCase(fetchUserProfile.rejected, (state) => {
        state.userInfo = null;
      })

      .addCase(fetchNotificationCount.fulfilled, (state, action) => {
        state.countNoti = action.payload;
      })
      .addCase(fetchNotificationCount.rejected, (state, action) => {
        state.countNoti = 0;
        console.error(
          `Failed to get count notification ${action.meta.arg}:`,
          action.payload
        );
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

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import UserServices from '../services/userServices';

export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token; // Lấy token từ Redux state
      if (!token) return rejectWithValue('No token found');

      const response = await UserServices.getProfile(token);

      return response.data;
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
    userInfo: null,
  },

  reducers: {
    loginSuccess: (state, action) => {
      state.userId = action.payload.userId;
      state.token = action.payload.token;
      state.isLogin = true;
      Cookies.set('token', action.payload.token, { expires: 7 }); // Token lưu trong 7 ngày
      localStorage.setItem('userId', action.payload.userId);
    },
    logout: (state) => {
      state.userId = null;
      state.token = '';
      state.userInfo = null;
      state.isLogin = false;
      Cookies.remove('token');
      localStorage.removeItem('userId');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.userInfo = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state) => {
        state.userInfo = null;
      });
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;

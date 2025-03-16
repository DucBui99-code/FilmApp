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

      const [responseUserInfor, respponsePendingBills] = await Promise.all([
        UserServices.getProfile(),
        UserServices.getProfile(1),
      ]);

      const pendingBills =
        respponsePendingBills.data
          .filter((bill) => bill.status === 'pending')
          .map((bill) => bill.transactionId) || [];

      return { userInfo: responseUserInfor.data, pendingBills: pendingBills };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch profile');
    }
  }
);

export const checkBillStatus = createAsyncThunk(
  'bills/checkBillStatus',
  async (billId, { dispatch, rejectWithValue }) => {
    try {
      const result = await movieServices.checkBill({ transactionId: billId });

      if (result.data.return_code === 1 || result.data.return_code === 2) {
        dispatch(
          setPopup({
            isShow: true,
            packageName: result.data.packageName,
            status: result.data.return_code,
          })
        );
        dispatch(removeBill({ billId })); // Xóa bill nếu đã hoàn thành
      }
      return result;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Failed to check bill status'
      );
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
    pendingBills: [],
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
      state.pendingBills = [];
    },
    addBill: (state, action) => {
      const { billId } = action.payload;
      if (!state.pendingBills.includes(billId)) {
        state.pendingBills.push(billId);
      }
    },
    removeBill: (state, action) => {
      const { billId } = action.payload;
      state.pendingBills = state.pendingBills.filter((id) => id !== billId);
    },
    addCountNoti: (state, action) => {
      state.countNoti++;
    },
    removeCountNoti: (state, action) => {
      state.countNoti--;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.userInfo = action.payload.userInfo;
        state.pendingBills = action.payload.pendingBills;
      })
      .addCase(fetchUserProfile.rejected, (state) => {
        state.userInfo = null;
        state.pendingBills = [];
      })
      .addCase(checkBillStatus.fulfilled, (state, action) => {
        console.log(`Bill ${action.meta.arg} checked:`, action.payload);
      })
      .addCase(checkBillStatus.rejected, (state, action) => {
        console.error(
          `Failed to check bill status for bill ${action.meta.arg}:`,
          action.payload
        );
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
  addBill,
  removeBill,
  addCountNoti,
  removeCountNoti,
} = authSlice.actions;
export default authSlice.reducer;

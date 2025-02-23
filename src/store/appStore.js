import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async action để xử lý loading
export const setLoadingAsync = createAsyncThunk(
  'auth/setLoadingAsync',
  async (_, { dispatch }) => {
    dispatch(setLoading(true));
    await new Promise((resolve) => setTimeout(resolve, 500));
    dispatch(setLoading(false));
  }
);

const appStore = createSlice({
  name: 'app',
  initialState: {
    loading: false,
    billInfor: {
      isShow: false,
      packageName: '',
      status: '',
    },
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setPopup: (state, action) => {
      const { isShow, packageName, status } = action.payload;
      state.billInfor.isShow = isShow;
      state.billInfor.packageName = packageName;
      state.billInfor.status = status;
    },
  },
});

export const { setLoading, setPopup } = appStore.actions;
export default appStore.reducer;

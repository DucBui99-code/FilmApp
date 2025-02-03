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
  name: 'auth',
  initialState: { loading: false },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = appStore.actions;
export default appStore.reducer;

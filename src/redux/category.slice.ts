import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCategories } from '../services/category.service';
import { Category } from '../types/category.type';

type CategoryState = {
  categories: Category[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
};

const initialState: CategoryState = {
  categories: [],
  status: 'idle',
};

export const loadCategories = createAsyncThunk(
  'categories/getAll',
  async () => {
    const categories = await getCategories();
    return categories;
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(loadCategories.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default categorySlice.reducer;

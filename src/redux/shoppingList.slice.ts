import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ShoppingListState, ShoppingListItem } from '../types/shoppingList.type';
import { saveShoppingList } from './../services/shoppingList.service'
type ShoppingListSliceState = {
  shoppingList: ShoppingListState;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  finishOrderStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  finishOrderError: string | null;

};

const initialState: ShoppingListSliceState = {
  shoppingList: {},
  status: 'idle',
  finishOrderStatus: 'idle',
  finishOrderError: null
};

export const finishOrder = createAsyncThunk(
  'shoppingList/finishOrder',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { shoppingList: ShoppingListSliceState };
      const shoppingList = state.shoppingList.shoppingList;
      // ממיר את האובייקט למערך פשוט של מוצרים לשליחה לשרת
      const productsToSend = Object.entries(shoppingList).flatMap(([categoryId, category]) =>
        category.items.map(item => ({
          categoryId: Number(categoryId),
          productName: item.name,
          quantity: item.quantity,
        }))
      );
      const response = await saveShoppingList(productsToSend);
      return response;
    } catch (error: any) {
      console.log(error.response?.data || 'Error finishing order')
      return rejectWithValue('ארעה שגיאה בשמירת רשימת הקניות');
    }
  }
);

const shoppingListSlice = createSlice({
  name: 'shoppingList',
  initialState,
  reducers: {
    addItemToShoppingList: (
      state,
      action: PayloadAction<{
        categoryId: number;
        categoryName: string;
        itemName: string;
      }>
    ) => {
      const { categoryId, categoryName, itemName } = action.payload;
      if (!state.shoppingList[categoryId]) {
        state.shoppingList[categoryId] = {
          categoryName,
          items: [],
        };
      }

      const existingItem = state.shoppingList[categoryId].items.find(
        (item: ShoppingListItem) => item.name === itemName
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.shoppingList[categoryId].items.push({ name: itemName, quantity: 1 });
      }
    },
    clearShoppingList: (state) => {
      state.shoppingList = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(finishOrder.pending, (state) => {
        state.finishOrderStatus = 'loading';
        state.finishOrderError = null;
      })
      .addCase(finishOrder.fulfilled, (state) => {
        state.finishOrderStatus = 'succeeded';
        state.shoppingList = {}; // איפוס הסל אחרי סיום הזמנה
      })
      .addCase(finishOrder.rejected, (state, action) => {
        state.finishOrderStatus = 'failed';
        state.finishOrderError = action.payload as string;
      });
  },
});

export const { addItemToShoppingList, clearShoppingList } = shoppingListSlice.actions;
export default shoppingListSlice.reducer;

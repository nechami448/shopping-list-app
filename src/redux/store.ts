import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './category.slice';
import shoppingListReducer from './shoppingList.slice';

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    shoppingList: shoppingListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
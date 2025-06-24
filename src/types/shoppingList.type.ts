export type ShoppingListItem = {
  name: string;
  quantity: number;
};

export type ShoppingListCategory = {
  categoryName: string;
  items: ShoppingListItem[];
};

export type ShoppingListState = {
  [categoryId: number]: ShoppingListCategory;
};

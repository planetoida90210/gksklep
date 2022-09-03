import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface BasketState {
  items: Product[]
};

const initialState: BasketState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state: BasketState, action: PayloadAction<Product>) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (
      state: BasketState,
      action: PayloadAction<{ id: string }>
    ) => {
      const index = state.items.findIndex(
        (item: Product) => item._id === action.payload.id
      );
      let newBasket = [...state.items];

      if (index >= 0) {
        newBasket.splice(index,1);
      } else {
        console.log(
          `Nie mozna usunąć produktu (id: ${action.payload.id}) ponieważ nie jest w koszyku!`
        );
      }

      state.items = newBasket;
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors
export const selectBasketItems = (state: RootState) => state.basket.items;

export default basketSlice.reducer
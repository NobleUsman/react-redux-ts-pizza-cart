import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  quantity: number;
  addons: boolean;
  discount: number;
}

const initialState: CartState = {
  quantity: 0,
  addons: false,
  discount: 0
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increaseQuantity: (state) => {
      state.quantity++;
    },
    decreaseQuantity: (state) => {
      if (state.quantity > 0) {
        state.quantity--;
      }
    },
    toggleAddons: (state) => {
      state.addons = !state.addons;
    },
    setDiscount: (state, action: PayloadAction<number>) => {
      state.discount = action.payload;
    }
  }
});

export const {
  increaseQuantity,
  decreaseQuantity,
  toggleAddons,
  setDiscount
} = cartSlice.actions;

export default cartSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isPreLoaded: false,
  items: [],
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    setIsPreLoadedToTrue: (state, action) => {
      state.isPreLoaded = true;
    },
    setIsPreLoadedToFalse: (state, action) => {
      state.isPreLoaded = false;
    },
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (basketItem) => basketItem.id === action.payload.id
      );

      let newBasket = [...state.items];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cannot remove product {id: ${action.payload.id} as it's not in the REDUX store}`
        );
      }

      state.items = newBasket;
    },
  },
});

export const {
  addToBasket,
  removeFromBasket,
  setIsPreLoadedToTrue,
  setIsPreLoadedToFlase,
} = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) =>
  state.basket.items.reduce((total, item) => total + item.price, 0);

export default basketSlice.reducer;

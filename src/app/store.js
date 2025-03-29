import { configureStore } from '@reduxjs/toolkit';
import basketReducer from '../slices/basketSlice';
import { createWrapper } from 'next-redux-wrapper';

// GLOBAL Store
const makestore = () =>
  configureStore({
    reducer: {
      basket: basketReducer,
    },
  });

export const store = createWrapper(makestore);

import { configureStore } from '@reduxjs/toolkit';
import flightReducer from '../slices/airlineSlice';

export const store = configureStore({
  reducer: {
    flight: flightReducer,
  },
});

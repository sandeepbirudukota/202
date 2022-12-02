import { createSlice } from '@reduxjs/toolkit';

const getInitialFlight = () => {
  // getting flight list
  const localFlightList = window.localStorage.getItem('flightList');
  // if flight list is not empty
  if (localFlightList) {
    return JSON.parse(localFlightList);
  }
  window.localStorage.setItem('flightList', []);
  return [];
};

const initialValue = {
  filterStatus: 'all',
  flightList: getInitialFlight(),
};

export const airlineSlice = createSlice({
  name: 'flight',
  initialState: initialValue,
  reducers: {
    addFlight: (state, action) => {
      state.flightList.push(action.payload);
      const flightList = window.localStorage.getItem('flightList');
      if (flightList) {
        const flightListArr = JSON.parse(flightList);
        flightListArr.push({
          ...action.payload,
        });
        window.localStorage.setItem('flightList', JSON.stringify(flightListArr));
      } else {
        window.localStorage.setItem(
          'flightList',
          JSON.stringify([
            {
              ...action.payload,
            },
          ])
        );
      }
    },
    updateFlight: (state, action) => {
      const flightList = window.localStorage.getItem('flightList');
      if (flightList) {
        const flightListArr = JSON.parse(flightList);
        flightListArr.forEach((flight) => {
          if (flight.id === action.payload.id) {
            flight.type = action.payload.type;
            flight.airlineName = action.payload.airlineName;
            flight.arrivalTime = action.payload.arrivalTime;
            flight.departureTime = action.payload.departureTime;
            flight.origin = action.payload.origin;
            flight.destination = action.payload.destination;
            flight.flightNo = action.payload.flightNo;
          }
        });
        window.localStorage.setItem('flightList', JSON.stringify(flightListArr));
        state.flightList = [...flightListArr];
      }
    },
    deleteFlight: (state, action) => {
      const flightList = window.localStorage.getItem('flightList');
      if (flightList) {
        const flightListArr = JSON.parse(flightList);
        flightListArr.forEach((flight, index) => {
          if (flight.id === action.payload) {
            flightListArr.splice(index, 1);
          }
        });
        window.localStorage.setItem('flightList', JSON.stringify(flightListArr));
        state.flightList = flightListArr;
      }
    },
    updateFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
  },
});

export const { addFlight, updateFlight, deleteFlight, updateFilterStatus } =
  airlineSlice.actions;
export default airlineSlice.reducer;

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { processesApi } from "./processes/processes.api";
import processSlice from "./slice/processSlice";

const rootReducer = combineReducers({
  [processesApi.reducerPath]: processesApi.reducer,
  process: processSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

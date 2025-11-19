import { configureStore, combineReducers } from "@reduxjs/toolkit";
import equipmentsReducer from '../features/lifting-accessorys/state/LiftingCalculatorSlice'



const appReducer = combineReducers({
    equipmentsReducer
});

const store = configureStore({
    reducer:appReducer
});

export type RootState = ReturnType<typeof appReducer>;
export type AppDispatch = typeof store.dispatch;
export default store;
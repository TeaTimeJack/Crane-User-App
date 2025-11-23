import { configureStore, combineReducers } from "@reduxjs/toolkit";
import equipmentsReducer from '../features/lifting-accessorys/state/LiftingCalculatorSlice'
import userInfoReducer  from '../features/user-info/state/userInfoSlice.ts'



const appReducer = combineReducers({
    equipmentsReducer,
    userInfoReducer
});

const store = configureStore({
    reducer:appReducer
});

export type RootState = ReturnType<typeof appReducer>;
export type AppDispatch = typeof store.dispatch;
export default store;
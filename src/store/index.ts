import { configureStore } from "@reduxjs/toolkit";
import governmentMembersFullInfo from "./slices/GovernmetMembersFullInfo";
import uniqueProduct from "./slices/UniqueProduct";

export const store = configureStore({
    reducer: {
        membersFullInfo: governmentMembersFullInfo,
        uniqueProduct: uniqueProduct,
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


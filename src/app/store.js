import { configureStore } from "@reduxjs/toolkit";
import transactoinReducer from "../features/transaction/transactionSlice"

export const store = configureStore({
    reducer: {
        transaction : transactoinReducer
    },
});

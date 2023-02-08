import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addTransactions, deleteTransactions, editTransactions, getTransactions,selectTransactions } from "./transactionApi";

const initialState = {
    transactions : [],
    isLoading : false,
    error : '',
    isError : false,
    editing : {},
    deleteOperation : false,
    pagination : []
};


export const fetchTransactions = createAsyncThunk('transaction/fetchTransactions', async () => {
    const transactions = await getTransactions();
    return transactions;
})

export const createTransaction = createAsyncThunk('transaction/createTransaction', async (data) => {
    const transaction = await addTransactions(data);
    return transaction;
})

export const changeTransactions = createAsyncThunk('transaction/changeTransactions', async ({id,data}) => {
    const transaction = await editTransactions(id,data);
    return transaction;
})


export const removeTransactions = createAsyncThunk("transaction/removeTransactions", async (data) => {
    const transaction = await deleteTransactions(data);
    return transaction;
})


export const filterTransactions = createAsyncThunk("transaction/filterTransactions", async (data) => {
    const transaction = await selectTransactions(data);
    return transaction;
})



const transactionSlice = createSlice({
    name : 'transaction',
    initialState,
    reducers : {
      editActive : (state,action) => {
        state.editing = action.payload
      },
      editInActive : (state) => {
        state.editing = {}
      }
    },
    extraReducers : (builder) => {
        builder.addCase(fetchTransactions.pending , (state,action) => {
            state.isError = false;
            state.isLoading = true;
        }).addCase(fetchTransactions.fulfilled, (state,action) => {
            state.isError = false;
            state.isLoading = false;
            state.transactions = action.payload
            state.deleteOperation = false
        })
        .addCase(fetchTransactions.rejected, (state,action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message
            state.transactions = [];

        })
        .addCase(createTransaction.pending , (state,action) => {
            state.isError = false;
            state.isLoading = true;
        }).addCase(createTransaction.fulfilled, (state,action) => {
            state.isError = false;
            state.isLoading = false;
            state.transactions.push(action.payload) 
        })
        .addCase(createTransaction.rejected, (state,action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message
       

        })
        .addCase(changeTransactions.pending , (state,action) => {
            state.isError = false;
            state.isLoading = true;
        }).addCase(changeTransactions.fulfilled, (state,action) => {
            state.isError = false;
            state.isLoading = false;
            
            const indextoUpdate = state.transactions.findIndex(t => t.id === action.payload.id);

            state.transactions[indextoUpdate] = action.payload;
        })
        .addCase(changeTransactions.rejected, (state,action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message
       

        })
        .addCase(removeTransactions.pending , (state,action) => {
            state.isError = false;
            state.isLoading = true;
        }).addCase(removeTransactions.fulfilled, (state,action) => {
            state.isError = false;
            state.isLoading = false;
            
            state.transactions = state.transactions.filter(t => t.id !== action.payload);
            state.deleteOperation = true;
        })
        .addCase(removeTransactions.rejected, (state,action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message
       

        }).addCase(filterTransactions.pending , (state,action) => {
            state.isError = false;
            state.isLoading = true;
        }).addCase(filterTransactions.fulfilled, (state,action) => {
            state.isError = false;
            state.isLoading = false;
            state.transactions = action.payload
            state.deleteOperation = false
        })
        .addCase(filterTransactions.rejected, (state,action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message
            state.transactions = [];

        })
    }
})

export default transactionSlice.reducer;
export const {editActive,editInActive} = transactionSlice.actions;

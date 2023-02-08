import axios from "../../utils/axios";


export const getTransactions = async () => {
    const response = await axios.get("/transactions");

    return response.data;
}

export const addTransactions = async (data) => {
    const response = await axios.post("/transactions",data);

    return response.data;
}


export const editTransactions = async (id,data) => {
    const response = await axios.put(`/transactions/${id}`,data);

    return response.data;
}


export const deleteTransactions = async (id) => {
    const response = await axios.delete(`/transactions/${id}`);

    return response.data;
}


export const selectTransactions = async (data) => {
    
    const response = await axios.get(`/transactions?type=${data}`);
    console.log(response,data)
    return response.data;
}
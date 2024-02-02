import Axios from "axios";
const baseURL = `${process.env.REACT_APP_API_URL}:3010/api/orders`;

const ordersApi = {
    getOrders : async () => {
        try {
            const response = await Axios.get(`${baseURL}/get`);
            return response.data;
        } catch (error) {
            console.error("ordersAPI error: ", error);
            throw error;
        }
    },
    
    getOrder : async (id) => {
        try {
            const response = await Axios.get(`${baseURL}/get/${id}`);
            return response.data;
        } catch (error) {
            console.error("ordersAPI error: ", error);
            throw error;
        }
    },
    
    addOrder : async (order) => {
        try {
            const response = await Axios.post(`${baseURL}/add`, order);
            return response.data;
        } catch (error) {
            console.error("ordersAPI error: ", error);
            throw error;
        }
    },

    updateOrder : async (order) => {
        try {
            const response = await Axios.put(`${baseURL}/update`, order);
            return response.data;
        } catch (error) {
            console.error("ordersAPI error: ", error);
            throw error;
        }
    },

    deleteOrder : async (id) => {
        try {
            const response = await Axios.delete(`${baseURL}/delete/${id}`);
            return response.data;
        } catch (error) {
            console.error("ordersAPI error: ", error);
            throw error;
        }
    },

    getLastOrderID : async () => {
        try {
            const response = await Axios.get(`${baseURL}/getLastOrderId`);
            return response.data;
        } catch (error) {
            console.error("ordersAPI error: ", error);
            throw error;
        }
    }
}

export default ordersApi;
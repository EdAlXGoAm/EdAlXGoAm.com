import Axios from "axios";
import comandasApi from './comandasApi';

const baseURL = `${process.env.REACT_APP_API_URL}:3010/api/orders`;

const ordersApi = {
    getOrders : async () => {
        try {
            const orders = await Axios.get(`${baseURL}/get`);
            const comandasPromises = orders.data.map( order => comandasApi.getComandasByOrderId(order.OrderID) );
            const comandas = await Promise.all(comandasPromises);
            
            const ordersWithComandas = orders.data.map((order, index) => {
                order.ComandasList = comandas[index];
                return order;
            });
            return ordersWithComandas;
        } catch (error) {
            console.error("ordersAPI error: ", error);
            throw error;
        }
    },
    
    // getOrder : async (id) => {
    //     try {
    //         const response = await Axios.get(`${baseURL}/get/${id}`);
    //         return response.data;
    //     } catch (error) {
    //         console.error("ordersAPI error: ", error);
    //         throw error;
    //     }
    // },
    
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
            // Delete ComandasList from order
            const orderWithoutComandas = { ...order };
            delete orderWithoutComandas.ComandasList;
            await Axios.put(`${baseURL}/update`, orderWithoutComandas);

            // Segundo, obtén las comandas existentes
            const existingComandas = await comandasApi.getComandasByOrderId(order.OrderID);
    
            // Tercero, determina qué comandas eliminar (las que están en existingComandas pero no en order.ComandasList)
            const existingComandasIds = existingComandas.map(c => c._id);
            const updateComandasIds = order.ComandasList.map(c => c._id);
            const comandasToDelete = existingComandasIds.filter(id => !updateComandasIds.includes(id));

            // Cuarto, elimina las comandas que ya no están presentes
            const deletePromises = comandasToDelete.map(id => comandasApi.deleteComanda(id));
            await Promise.all(deletePromises);

            const comandasPromises = order.ComandasList.map(comanda => {
                // First evaluate if comanda._id is undefined, then add new comanda
                if (comanda._id === undefined) {
                    return comandasApi.addComanda(comanda);
                }
                // Otherwise, update comanda
                return comandasApi.updateComanda(comanda);
            });
            await Promise.all(comandasPromises);
    
            return { message: "Order updated successfully!" };
        } catch (error) {
            console.error("ordersAPI error: ", error);
            throw error;
        }
    },

    deleteOrder : async (id) => {
        try {
            // Segundo, obtén las comandas existentes
            const existingComandas = await comandasApi.getComandasByOrderId(id);
    
            // Tercero, determina qué comandas eliminar (las que están en existingComandas pero no en order.ComandasList)
            const existingComandasIds = existingComandas.map(c => c._id);
            
            // Cuarto, elimina las comandas de existingComandas
            const deletePromises = existingComandasIds.map(id => comandasApi.deleteComanda(id));
            await Promise.all(deletePromises);

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
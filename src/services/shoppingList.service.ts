import axios from 'axios';

// export const getShoppingList = async () => {
//     const response = await axios.get('/api/shopping-list/get-all-shopping-list');
//     return response.data;
// };

export const createProducts = (products: { categoryId: number; productName: string; quantity: number }[]) => {
    return axios.post('/api/order/save-shopping-list', products);
};

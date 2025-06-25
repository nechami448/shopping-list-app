import axios from 'axios';

export const createProducts = (products: { categoryId: number; productName: string; quantity: number }[]) => {
    return axios.post('/api/order/save-shopping-list', products);
};

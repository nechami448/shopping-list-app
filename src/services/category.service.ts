import axios from 'axios';
import { Category } from '../types/category.type';

export const getCategories = async () => {
  const response = await axios.get('/api/category/get-all-categories');
  return response.data;
};


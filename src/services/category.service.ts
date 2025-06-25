import axios from 'axios';

export const getCategories = async () => {
  const response = await axios.get('/api/category/get-all-categories');
  return response.data;
};


import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { loadCategories } from '../redux/category.slice';
import { addItemToShoppingList } from '../redux/shoppingList.slice';

export default function ProductForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, status } = useSelector((state: RootState) => state.categories);

  const [productName, setProductName] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | ''>('');

  useEffect(() => {
    if (categories.length === 0 && status !== 'loading') {
      dispatch(loadCategories());
    }
  }, [categories, status, dispatch]);

  const handleAdd = () => {
    if (!productName || !selectedCategoryId) {
      alert('אנא מלא/י את שם המוצר והקטגוריה');
      return;
    }

    const selectedCategory = categories.find(cat => cat.id === selectedCategoryId);
    if (!selectedCategory) {
      alert('קטגוריה לא תקינה');
      return;
    }

    dispatch(addItemToShoppingList({
      categoryId: selectedCategoryId,
      categoryName: selectedCategory.name,
      itemName: productName,
    }));
    setProductName('');
    setSelectedCategoryId('')
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '90%',
        maxWidth: 400,
        margin: '2rem auto',
        p: 3,
      }}
    >
      <TextField
        label="שם מוצר"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        dir="rtl"
        sx={{ width: '100%', mb: 2 }}
        inputProps={{ style: { textAlign: 'right' } }}
      />

      <TextField
        select
        label="קטגוריה"
        dir="rtl"
        value={selectedCategoryId}
        onChange={(e) => setSelectedCategoryId(Number(e.target.value))}
        sx={{ width: '100%', mb: 2 }}

      >
        {categories && categories.length > 0 ? (
          categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id} sx={{ direction: 'ltr' }}>
              {cat.name}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>אין קטגוריות זמינות</MenuItem>
        )}
      </TextField>

      <Button
        variant="contained"
        sx={{
          alignSelf: 'center',
        }}
        onClick={handleAdd}
      >
        הוסף
      </Button>
    </Box>
  );
}

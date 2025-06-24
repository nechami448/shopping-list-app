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

  // טען קטגוריות אם טרם נטענו
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
      dir="rtl"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '90%',
        maxWidth: 400,
        margin: '2rem auto',
        p: 3,
        border: '1px solid var(--pink-color)',
        borderRadius: 2,
        boxShadow: '0 2px 8px var(--pink-shadow)',
        backgroundColor: '#fff',
      }}
    >
      <TextField
        label="שם מוצר"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        sx={{ width: '100%', mb: 2 }}
        InputLabelProps={{ style: { textAlign: 'right', direction: 'rtl' } }}
        inputProps={{ style: { textAlign: 'right', direction: 'rtl' } }}
      />

      <TextField
        select
        label="קטגוריה"
        value={selectedCategoryId}
        onChange={(e) => setSelectedCategoryId(Number(e.target.value))}
        sx={{ width: '100%', mb: 2 }}
        InputLabelProps={{ style: { textAlign: 'right', direction: 'rtl' } }}
        inputProps={{ style: { textAlign: 'right', direction: 'rtl' } }}
      >
        {categories && categories.length > 0 ? (
          categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
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
          backgroundColor: 'var(--pink-color)',
          '&:hover': {
            backgroundColor: 'var(--pink-color-dark)',
          },
        }}
        onClick={handleAdd}
      >
        הוסף
      </Button>
    </Box>
  );
}

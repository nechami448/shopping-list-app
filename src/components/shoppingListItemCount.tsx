import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Box, Typography } from '@mui/material';

const ShoppingListItemCount: React.FC = () => {
    const shoppingList = useSelector((state: RootState) => state.shoppingList.shoppingList);

    // סכימת כל הכמויות מכל הקטגוריות
    const totalItems = Object.values(shoppingList).reduce((sum, category) => {
        return sum + category.items.reduce((catSum, item) => catSum + item.quantity, 0);
    }, 0);

    return (
        <Box sx={{ position: 'absolute', top: 16, left: 16 }}>
            <Typography variant="subtitle1" fontWeight="bold">
                סה"כ מוצרים: {totalItems}
            </Typography>
        </Box>
    );
};

export default ShoppingListItemCount;

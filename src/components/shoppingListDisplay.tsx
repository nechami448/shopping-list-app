import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Grid, Typography } from '@mui/material';
import ShoppingCategoryList from './shoppingCategoryList';
import { RootState } from '../redux/store';
import { ShoppingListCategory } from '../types/shoppingList.type';

const ShoppingListDisplay: React.FC = () => {
    const shoppingList = useSelector((state: RootState) => state.shoppingList.shoppingList);

    const categories = Object.values(shoppingList);

    if (categories.length === 0) {
        return (
            <Typography sx={{ p: 2, textAlign: 'center' }} variant="body1">
                סל הקניות ריק
            </Typography>
        );
    }

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                bgcolor: 'background.paper',
                borderTop: '1px solid #ccc',
                p: 2,
                overflowX: 'auto',
            }}
        >
            <Grid container spacing={2} wrap="nowrap" sx={{ overflowX: 'auto' }}>
                {categories.map((category: ShoppingListCategory) => (
                    <Box key={category.categoryName} sx={{ minWidth: 220, mx: 1 }}>
                        <ShoppingCategoryList
                            categoryName={category.categoryName}
                            items={category.items}
                        />
                    </Box>
                ))}
            </Grid>
        </Box>
    );
};

export default ShoppingListDisplay;

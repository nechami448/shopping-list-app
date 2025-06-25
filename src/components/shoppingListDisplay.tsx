import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Grid, Typography, Divider } from '@mui/material';
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
        <>
            <Box sx={{ p: 2 }}>
                <Divider sx={{ mb: 1, backgroundColor: '#702f8a', height: '4px' }} />
                <Typography
                    variant="h6"
                    sx={{
                        textAlign: 'center',
                        color: '#702f8a',
                        mb: 2,
                        fontWeight: 'bold',
                    }}
                >
                    יש לאסוף מוצרים אלו במחלקות המתאימות
                </Typography>
            </Box>
            {/* הקטגוריות */}
            <Box
                sx={{
                    overflowX: 'auto',
                    textAlign: 'center',
                }}
            >
                <Grid container spacing={0} wrap="nowrap" sx={{ overflowX: 'auto', flexDirection: 'row-reverse', alignItems: 'top' }}>
                    {categories.map((category: ShoppingListCategory) => (
                        <Box key={category.categoryName} sx={{ minWidth: 155 }}>
                            <ShoppingCategoryList
                                categoryName={category.categoryName}
                                items={category.items}
                            />
                        </Box>
                    ))}
                </Grid>
            </Box>
        </>
    );
};

export default ShoppingListDisplay;

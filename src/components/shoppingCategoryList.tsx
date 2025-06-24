import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { ShoppingListItem } from '../types/shoppingList.type';

type ShoppingCategoryListProps = {
    categoryName: string;
    items: ShoppingListItem[];
};

const ShoppingCategoryList: React.FC<ShoppingCategoryListProps> = ({ categoryName, items }) => {
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <Box sx={{ p: 2, bgcolor: '#f9f9f9', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="subtitle1" fontWeight={600} textAlign="center">
                {categoryName} ({totalQuantity})
            </Typography>

            <List dense sx={{ mt: 1 }}>
                {items.map((item) => (
                    <ListItem key={item.name} disablePadding>
                        <ListItemText primary={`${item.name} - ${item.quantity}`} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default ShoppingCategoryList;

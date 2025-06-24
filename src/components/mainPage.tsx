import { Container, Typography } from '@mui/material';
import React from 'react';
import ProductForm from './addProductForm';
import FinishOrderButton from './finishOrderButton';
import ShoppingListDisplay from './shoppingListDisplay';
import ShoppingListItemCount from './shoppingListItemCount';

export default function MainPage() {
    return (
        <>
            <Container maxWidth="sm" sx={{ py: 4 }}>
                <ShoppingListItemCount />
                <Typography variant="h4" textAlign="center" gutterBottom>
                    רשימת קניות
                </Typography>
                <ProductForm />
                <FinishOrderButton />
                <ShoppingListDisplay />
            </Container>

        </>
    )
}

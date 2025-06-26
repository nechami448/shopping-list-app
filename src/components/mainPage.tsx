import { Container, Typography } from '@mui/material';
import React from 'react';
import ProductForm from './addProductForm';
import ExportShoppingListButton from './ExportShoppingListButton';
import FinishOrderButton from './finishOrderButton';
import ShoppingListDisplay from './shoppingListDisplay';
import TotalItems from './totalItems';

export default function MainPage() {
    return (
        <>
            <Container maxWidth="md" sx={{ py: 4 }}>
                <TotalItems />
                <Typography variant="h3" textAlign="center"
                    sx={{
                        mt: '2%',
                        color: '#702f8a',
                        fontWeight: 'bold',
                    }}>
                    רשימת קניות
                </Typography>
                <ProductForm />
                <ExportShoppingListButton />
                <FinishOrderButton />
                <ShoppingListDisplay />
            </Container>
        </>
    )
}

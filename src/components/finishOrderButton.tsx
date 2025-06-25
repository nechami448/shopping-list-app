import React from 'react';
import { Button, Box, CircularProgress, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import type { ThunkDispatch } from '@reduxjs/toolkit';
import type { RootState } from '../redux/store';
import type { AnyAction } from 'redux';
import { finishOrder } from '../redux/shoppingList.slice';

const FinishOrderButton: React.FC = () => {
    const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();
    const finishOrderStatus = useSelector((state: RootState) => state.shoppingList.finishOrderStatus);
    const finishOrderError = useSelector((state: RootState) => state.shoppingList.finishOrderError);
    const shoppingList = useSelector((state: RootState) => state.shoppingList.shoppingList);

    const loading = finishOrderStatus === 'loading';

    // בודק האם הסל ריק
    const isShoppingListEmpty = Object.keys(shoppingList).length === 0;

    const handleClick = () => {
        dispatch(finishOrder());
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
            <Button
                variant="contained"
                color="primary"
                onClick={handleClick}
                disabled={loading || isShoppingListEmpty} // ✅ מנטרל אם הסל ריק או אם טוען
                startIcon={loading && <CircularProgress size={20} color="inherit" />}
            >
                {loading ? 'שולח...' : 'סיים הזמנה'}
            </Button>

            {finishOrderError && (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                    {finishOrderError}
                </Typography>
            )}
        </Box>
    );
};

export default FinishOrderButton;

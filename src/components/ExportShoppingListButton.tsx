import React from 'react';
import jsPDF from 'jspdf';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Box, Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

// פונקציה להפוך טקסט כדי שיהיה נכון בעברית
const reverseText = (text: string) => text.split('').reverse().join('');

// טעינת הפונט Alef מהתיקייה public/fonts
const loadFont = async (doc: jsPDF) => {
    const response = await fetch('/fonts/Alef-Regular.ttf');
    const buffer = await response.arrayBuffer();
    const uint8Array = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < uint8Array.byteLength; i++) {
        binary += String.fromCharCode(uint8Array[i]);
    }
    const base64String = btoa(binary);

    doc.addFileToVFS('Alef-Regular.ttf', base64String);
    doc.addFont('Alef-Regular.ttf', 'Alef', 'normal');
    doc.setFont('Alef');
};

// פונקציה לשרטוט קו תחתון (underline) מתחת לטקסט בלבד
const drawUnderline = (
    doc: jsPDF,
    text: string,
    x: number,
    y: number,
    align: 'right' | 'left' | 'center' = 'left'
) => {
    const textWidth = doc.getTextWidth(text);
    let startX = x;

    if (align === 'center') {
        startX = x - textWidth / 2;
    } else if (align === 'right') {
        startX = x - textWidth;
    }

    const underlineY = y + 1.5; // קצת מתחת לטקסט

    doc.setDrawColor(79, 195, 247); // צבע תכלת
    doc.setLineWidth(0.8);
    doc.line(startX, underlineY, startX + textWidth, underlineY);
};

const ExportShoppingListButton: React.FC = () => {
    const shoppingList = useSelector(
        (state: RootState) => state.shoppingList.shoppingList
    );

    const handleExport = async () => {
        const categories = Object.values(shoppingList);
        if (categories.length === 0) {
            alert('סל הקניות ריק');
            return;
        }

        const doc = new jsPDF();

        await loadFont(doc);

        // כותרת ראשית — במרכז עם underline
        doc.setFontSize(26);
        doc.setFont('Alef', 'normal');
        const title = 'רשימת קניות';
        doc.text(reverseText(title), 105, 20, { align: 'center' });
        drawUnderline(doc, reverseText(title), 105, 20, 'center');

        let currentY = 40;

        for (const category of categories) {
            // כותרת קטגוריה — מימין עם underline
            doc.setFontSize(16);
            const categoryTitle = `קטגוריה: ${category.categoryName}`;
            doc.text(reverseText(categoryTitle), 190, currentY, { align: 'right' });
            drawUnderline(doc, reverseText(categoryTitle), 190, currentY, 'right');

            currentY += 12;

            // המוצרים
            doc.setFontSize(12);
            for (const item of category.items) {
                const line = `${item.name} - כמות: ${item.quantity}`;
                doc.text(reverseText(line), 190, currentY, { align: 'right' });
                currentY += 8;

                // בדיקה אם צריך לעבור עמוד
                if (currentY > 280) {
                    doc.addPage();
                    currentY = 20;
                }
            }

            currentY += 15; // רווח בין קטגוריות
        }

        doc.save('shopping-list.pdf');
    };

    return (
        <Box sx={{ mt: 2 }}>
            <Button
                variant="outlined"
                color="primary"
                startIcon={<FileDownloadIcon />}
                onClick={handleExport}
                disabled={Object.keys(shoppingList).length === 0}
                sx={{ direction: 'ltr' }}
            >
                יצוא רשימה ל-PDF
            </Button>
        </Box>
    );
};

export default ExportShoppingListButton;

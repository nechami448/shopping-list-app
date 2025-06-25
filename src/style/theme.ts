import { createTheme } from '@mui/material/styles';
import { heIL } from "@mui/material/locale"; // תמיכה בעברית

export const theme = createTheme({
    direction: 'rtl',
    typography: { fontFamily: 'inherit' },
    palette: {
        primary: {
            main: '#702f8a', 
            light: '#b3e5fc',
            dark: '#0288d1',
            contrastText: '#fff',
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    direction: "rtl",
                    backgroundColor: "#f5f5f5",
                },
            },
        },
    }
},
    heIL
);

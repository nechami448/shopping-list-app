import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import { heIL } from "@mui/material/locale"; // תמיכה בעברית

export const theme = createTheme({
  direction: 'rtl',
  typography: { fontFamily: 'inherit' },
  palette: {
    primary: {
      main: '#702f8a', // תכלת (light blue)
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

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

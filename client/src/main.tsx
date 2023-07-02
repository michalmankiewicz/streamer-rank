import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7a3aed',
      light: '#f2ebfd',
    },
    secondary: {
      main: '#ff007a',
    },
    background: {
      default: '#04172d',
    },
    text: {
      // primary: '#fff',
    },
  },

  shape: {
    borderRadius: 3,
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

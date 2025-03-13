import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router } from 'react-router-dom';
import { darkTheme } from './theme';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router basename="/valconnect-dashboard">
        <Dashboard />
      </Router>
    </ThemeProvider>
  );
}

export default App;

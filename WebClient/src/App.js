import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import './App.css';
import Start from './Start';
import NavBar from './navBar'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1e90ff'
    }
  }
});

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <NavBar />
      <div className="start">
        <Start />
      </div>
    </MuiThemeProvider>
  );
}

export default App;

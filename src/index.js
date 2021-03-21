import React from 'react';
import ReactDOM from 'react-dom';
import { StoreProvider } from 'easy-peasy';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
// import { grey } from '@material-ui/core/colors';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import store from './store';
import './index.css';
import 'fontsource-roboto';
import App from './App';
import reportWebVitals from './reportWebVitals';

const theme = createMuiTheme({
  palette: {
    type: 'light',
    // background: {
    //   paper: '#222222',
    //   default: '#101010',
    // },
    // divider: grey[400],
  },
});

ReactDOM.render(
  // <React.StrictMode>
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <StoreProvider store={store}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <App />
      </BrowserRouter>
    </StoreProvider>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log) )
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

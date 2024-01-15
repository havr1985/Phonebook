import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; 
import { App } from 'components/App';
import { Provider } from 'react-redux';
import { persistor, store } from 'redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ChakraProvider, theme } from '@chakra-ui/react';


ReactDOM.createRoot(document.getElementById('root')).render(
  
    <Provider store={store}>
        <ChakraProvider theme={theme}>
        <BrowserRouter basename='/Phonebook'>
          <PersistGate loading={null} persistor={persistor}>
          <App />
           </PersistGate>
          </BrowserRouter>
         </ChakraProvider>
      </Provider>
  
);
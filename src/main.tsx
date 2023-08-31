import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react'

// app
import App from './App.tsx'

// css
import './index.css'


//store
import { store } from './store/index.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
)

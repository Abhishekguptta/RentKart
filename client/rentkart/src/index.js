import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';

import App from './App';
import './index.css';
const queryClient= new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient} contextSharing={true}>
          <App />
        </QueryClientProvider>
      </BrowserRouter >
    </React.StrictMode>
  </Provider>
);

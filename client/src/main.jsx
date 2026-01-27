import { createRoot } from 'react-dom/client'
import './index.css'
import React from 'react';
import {ReactDOM} from 'react-dom/client';
import {BrowserRouter as Router}  from 'react-router-dom';
import AppContextProvider from './context/AppContext.jsx';
import App from './App.jsx'
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  

    <Router>
    <AppContextProvider>  
      
        <App />
        <ToastContainer />
      
    
    </AppContextProvider>
    </Router>
 
)

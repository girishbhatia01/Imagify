import { useContext, useState } from 'react'

import viteLogo from '/vite.svg'
import './App.css'
import React from 'react';
import { Routes,Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Result from './pages/Result';
import BuyCredit from './pages/BuyCredits';
import Login from './components/Login';
import { AppContext } from './context/AppContext.jsx';
import ProtectedComponent from './components/ProtectedComponent.jsx'; 

function App() {
  const {showLogin} = useContext(AppContext);
  

  return (
    <div className='px-4 sm:px-6 md:px-10 lg:px-14 min-h-screen bg-linear-to-b from-teal-50 to-orange-50'>
      <Navbar />
      {showLogin && <Login/>}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/result' element={<Result />} />
        <Route path='/buycredit' element={<BuyCredit />} />
        <Route path='*' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
 
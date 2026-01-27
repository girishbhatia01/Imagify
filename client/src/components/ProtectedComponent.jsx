import React from 'react'
import Login from './Login.jsx';
import { AppContext } from '../context/AppContext.jsx';

const ProtectedComponent = ({children}) => {
    const {user}=React.useContext(AppContext);
  return (
    user ? (
      <>
        {children}
        {/* Protected content goes here */}
      </>
    ) : (
      <Login/>
    )
  )
}

export default ProtectedComponent
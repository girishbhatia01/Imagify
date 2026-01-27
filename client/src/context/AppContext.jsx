import React, { use } from "react";
import { createContext,useEffect } from "react";


export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [user,setUser]=React.useState('');
  const [showLogin,setShowLogin]=React.useState(false);
  const [token,setToken]=React.useState('');
  //it is wrong make a api call every time to get tokens because tokens can be changed on frontend by anyone
  const storedToken = localStorage.getItem("token");
  const [credits,setCredits]=React.useState(0);
  
  
  const loadcredits=async(token)=>{
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/getcredits`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setUser(data.user);
      setCredits(data.credits);
    } catch (error) {
      console.error("Error loading user credits:", error);
    }
  };
  useEffect(() => {
   
    if (storedToken) {
      console.log(storedToken);
      setToken(storedToken);
      loadcredits(storedToken);
    }
  }, []);
  
  const value = { user, setUser, showLogin, setShowLogin ,token,setToken,credits,setCredits,loadcredits};      
  return (  
    
    <AppContext.Provider value={value}>
      {children}
            </AppContext.Provider>
        );  
}
export default AppContextProvider;
import React, { useContext } from 'react'
import { useState,useEffect } from 'react';
import { AppContext } from '../context/AppContext.jsx';
import axios from "axios";

import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const {showLogin,setShowLogin,setToken} = useContext(AppContext);
    //create 3 state variables for name,email,password
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate=useNavigate();
    const {setUser}=useContext(AppContext);
    const backend_URL=import.meta.env.VITE_BACKEND_URL;
     useEffect(() => {
        // Prevent background scrolling when modal is open
        document.body.style.overflow = 'hidden';
        return () => {
          document.body.style.overflow = 'auto';
        }
      }, []);
      async function HandleSubmit(e){
        let responsedata={};
        e.preventDefault();
        if(isLogin)  {
          console.log(name,password);
          try {
             responsedata=await axios.post(`${backend_URL}/api/user/login`,
          {
            "email":email,
            "password":password
          }
        
          ,{headers: {
        
        'Content-Type': 'application/json'
    }
          })
          //console.log(responsedata);
          toast.success("Login Successful")
          setUser(responsedata.data.name);
          setShowLogin(false);
          //console.log("this is data",responsedata.data.token);
          localStorage.setItem("token",responsedata.data.token);
          setToken(responsedata.data.token);
          navigate('/result');

            
        } 
       
          catch (error) {
            toast.error("Login Failed",error.message)
            console.error("Error logging in user:", error.message);

            
          }
        

        }else{
          try {
             const res=await axios.post(`${backend_URL}/api/user/register`,
        {"username":name,
            "email":email,
            "password":password
          }
          ,{headers: {
            'Content-Type': 'application/json'
        }
          })
          console.log(res);
           toast.success("Register Successful")
           loadcredits();
           setUser(name);
          setShowLogin(false);
            
        } 
       
          catch (error) {
            toast.error("Register Failed",error)
            console.error("Error registering user:", error);

            
          }
        }

      }

  return (
    <div className='absolute top-0 bottom-0 left-0 right-0 z-10 backdrop-blur-sm bg-black/30 flex items-center justify-center'>
     <div className="w-full max-w-sm bg-white shadow-lg rounded-2xl p-8 relative">

        {/* Close Button */}
        <button className="absolute top-3 right-4 text-gray-500 text-xl hover:text-red-700" onClick={()=>{
          console.log("clicked");
          setShowLogin(false)}}>
          ✕
        </button>

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-center text-gray-900">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <p className="text-center text-gray-500 mt-1 mb-6">
          {isLogin
            ? "Welcome back! Please sign in to continue"
            : "Create your account to get started"}
        </p>

        {/* Form */}
        <form className="space-y-4" onSubmit={HandleSubmit}>

          {/* Name only for signup */}
          {!isLogin && (
            <div>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

         {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email id"
              className="w-full px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
           value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
          </div>
          

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
           value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Forgot password (only login) */}
          {isLogin && (
            <div className="text-right">
              <button className="text-sm text-blue-500 hover:underline">
                Forgot password?
              </button>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Toggle text */}
        <p className="text-center text-sm mt-5 text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 font-medium hover:underline"
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </p>
      </div>
    
    
    </div>
  )
}

export default Login
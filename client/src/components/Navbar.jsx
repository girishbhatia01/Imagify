 import React from 'react'
 import { Link } from 'react-router-dom'
 import { assets } from '../assets/myassets'
 import { AppContext } from '../context/AppContext.jsx'
 import { useNavigate } from 'react-router-dom';
 
 const Navbar = () => {
  const { user, setUser,setToken,credits } = React.useContext(AppContext);
  const { setShowLogin } = React.useContext(AppContext);
  const [open, setOpen] =React.useState(false);
  const Navigate=useNavigate();
  const logout=()=>{
    setUser('');
    localStorage.removeItem("token");
    setToken('');
    setShowLogin(false);
    Navigate('/');  
  }
    
   return (
     <div className='w-full flex items-center justify-between py-4'>
         <Link to='/'>
           <img src ={assets.logo} alt="Logo" className='h-8' />
            </Link>
           {user ? (
             <div className='flex items-center gap-6 mx-8'>
               <Link to='/buycredit' className='text-gray-600'>
                 <span className='text-gray-600 m-2 px-5 py-2  w-[176] h-[53] opacity-100 rounded-[50px] left-[965px] top-[19px]' style={{ background: '#D7EBFF' }}>credits left  : {credits}</span>
               </Link>
               <button type="button" onMouseEnter={() => setOpen(true)}
              className='relative bg-zinc-100 text-blue px-4 py-2 rounded-full hover:{}'><img src ={assets.profile_icon} alt="Logo" className='h-6 inline-block mr-1'  />Hi,{user}</button>
               {/* //when we hover login then shows a logout button here */}
           {/* <button type="button" className='bg-zinc-100 text-blue px-4 py-2 rounded-full'>Logout</button> */}

          {open && (
            <div className="absolute bg-white shadow-md">
              <button type="button"className='bg-zinc-100 text-blue px-4 py-2 rounded-full' onClick={logout}>Logout</button>
            </div>
          )}
         </div>
       ) : (
             <div className='flex items-center gap-6 mx-8'>
               <Link to='/buycredit' className='text-gray-600'>
                 <span className='text-gray-600 m-2'>pricing</span>
               </Link>
               <button type="button" onClick={()=>setShowLogin(true)} className='bg-zinc-800 text-white px-4 py-2 rounded-full'>Login</button>
             </div>
           )}
         </div>
       )}

 
 export default Navbar
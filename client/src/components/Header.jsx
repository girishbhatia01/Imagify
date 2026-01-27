import React from 'react'
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';

const Header = () => {
  const navigate = useNavigate();
  const { user, setShowLogin } = React.useContext(AppContext);
  const [images, setImages] = useState([
    'https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1579762715459-5a068c289fda?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop'
  ]);
   const generateNewImages = () => {
   
      navigate('/result');
  
  };

  return (
    <div className='flex flex-col items-center justify-center text-center mt-10 mb-10'>
      <div className=' w-[273px] h-10 opacity-100 rounded-[50px] border-[0.3px] border-solid border-[#7A7A7A] left-20 top-[151px] flex items-center justify-center font-normal text-[16px] text-[#7A7A7A]'>
        <p className='font-outfit font-normal text-[15px] leading-[100%] tracking-[0%] text-center align-middle'>Best Text to image converter</p>
      </div>
      
      <br/> <br/>
    <p className=' h-[190] opacity-100 text-center align-middle font-normal text-[80px] leading-20 tracking-[0%]  left-[390px] top-[207px]'>
      Turn Text to image in Seconds
    </p>
    <br/>
    <div className="min-w-full bg-linear-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center pt-10 px-4">
      {/* Generate Button */}
      <button
        onClick={generateNewImages}
        className="bg-black text-white px-8 py-4 rounded-full flex items-center gap-3 hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 mb-16"
      >
        <span className="text-lg font-medium">Generate Images</span>
       
      </button>

      {/* Image Grid */}
      <div className="flex flex-wrap justify-center gap-4 mb-6 max-w-4xl">
        {images.map((img, index) => (
          <div
            key={index}
            className="w-32 h-32 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer"
          >
            <img
              src={img}
              alt={`Generated ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Caption */}
      <p className="text-gray-600 text-sm mb-20">Generated images from imagify</p>

      {/* How it Works Section */}
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">How it works</h1>
        <p className="text-gray-600 text-lg">Give us your words we will convert them to images</p>
      </div>
    </div>
  
    
    </div>
  )
}

export default Header
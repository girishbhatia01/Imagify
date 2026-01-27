import React from 'react'
//import Navbar from '../components/Navbar'
import { useState } from 'react';
import { assets } from '../assets/myassets';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext.jsx';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



const Result = () => {
   const [imageUrl, setImageUrl] = useState(assets.sample_img_1);
   const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [prompt, setPrompt] = useState("");
  const {token,credits,setCredits,user,setShowLogin}=useContext(AppContext);
  const Navigate=useNavigate();
  const Backend_Url=import.meta.env.VITE_BACKEND_URL;
 
  const HandleGenerate = async () => {

    if (!prompt) {
      toast.error("Please enter a prompt");
      return;
    }
    setLoading(true);

    // Demo: Simulating image generation
   try {
    
      const response = await fetch(`${Backend_Url}/api/user/imagegeneration`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      if (response.ok) {
        setImageUrl(data.imageUrl);
        setCredits(data.credits);
        setIsImageLoaded(true);
        setLoading(false);
      } else {
        const message = data.message || "Failed to generate image";
        setLoading(false);
        toast.error(message);
        console.error("Error generating image:", data.message);
      }

   }
   catch (error) { 
     console.error("Error generating image:", error);
   }
  };

  return (
    <div className="min-h-screen bg-[#eefbf5] flex flex-col items-center justify-center p-6">
      {/* Image Box */}
      <div className="w-[420px] h-[420px] border-4 border-blue-400 rounded-lg flex items-center justify-center overflow-hidden bg-white shadow-md">
        {loading ? (
          <p className="text-gray-500 animate-pulse">Loading…</p>
        ) : imageUrl ? (
          <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <p className="text-gray-400">No image generated</p>
        )}
      </div>

      {/* Loading text (separate line) */}
      {loading && <p className="mt-2 text-sm text-gray-600">Loading…..</p>}

      {/* Prompt Input + Button */}
 {!isImageLoaded && (
   <form className="mt-8 w-full max-w-2xl flex items-center gap-4" onSubmit={(e) => { e.preventDefault(); 
   if(!user){
      toast.error("Please login to generate images");
      setShowLogin(true);
      return;
}
   credits > 0 ? HandleGenerate() :  toast.error("Insufficient credits") && Navigate('/buycredit');
 
 }}>
        <input
          type="text"
            placeholder="Describe what you want to generate"
          className="flex-1 px-5 py-3 rounded-full border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <button
          type="submit"
          className="px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-all"
        >
          Generate
        </button>
      </form>
 )}
      {isImageLoaded && (
      <div className="mt-4 flex gap-4">
        <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-all" onClick={()=>{
          setImageUrl(assets.sample_img_1);
          setIsImageLoaded(false);
          Navigate('/result');
        }}>Generate Another</button>
        {imageUrl && (
          <a
            href={imageUrl}
            download
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-all"
          >
            Download
          </a>

          

        )}
      </div>
      )}
      </div>

  )
}

export default Result
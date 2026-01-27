import React, { useContext } from 'react'
import { assets } from '../assets/myassets';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';


const BuyCredits = () => {
  const Navigate=useNavigate();
  const {token,user,setCredits,setShowLogin} = useContext(AppContext);
  const plans = [
  {
    name: "Basic",
    desc: "Best for personal use.",
    price: "$10",
    credits: "100",
  },
  {
    name: "Advanced",
    desc: "Best for business use.",
    price: "$50",
    credits: "500",
  },
  {
    name: "Business",
    desc: "Best for enterprise use.",
    price: "$250",
    credits: "5000",
  },
];
async function payNow(amount,addcredits,plan) {
      // Ensure Razorpay checkout script is loaded
      if(!user){
            toast.error("Please login to generate images");
            setShowLogin(true);
            return;
      }
      if (!window.Razorpay) {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        document.body.appendChild(script);
        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = reject;
        }).catch(() => { return alert('Failed to load Razorpay SDK'); });
      }
      //Create order by calling the server endpoint
        const { VITE_BACKEND_URL } = import.meta.env;
      const response = await fetch(`${VITE_BACKEND_URL}/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount, currency: 'INR', receipt: 'receipt#1', notes: {} })
      });

      
      const order = await response.json();
// const order = await rzp.orders.create({
//         amount: amount*100, // amount in the smallest currency unit
//         currency: "INR",
//         receipt: "order_rcptid_11",
//         partial_payment: false,
//       });
      // Open Razorpay Checkout
      console.log(order.id);
      
      const options = {
        key: "rzp_test_S3HymXCnoGGGtc", // Replace with your Razorpay key_id
        amount: amount, // Amount is in currency subunits (paise)
        currency: 'INR',
        name: 'Imagify',
        description: 'Test Transaction',
        order_id: order.id, // This is the order_id created in the backend
        callback_url: "http://localhost:5173/", // Your success URL
        prefill: {
          name: 'Girish Bhatia',
          email: 'girishbhatia0103@gmail.com',
          contact: '6267627495'
        },
        theme: {
          color: '#3399cc'
        },
        handler: async function (response){
          setCredits((prev)=>prev+addcredits);
        //console.log("response"+response );
      const updateResponse = await fetch(`${VITE_BACKEND_URL}/api/user/transaction`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify({
      orderId: order.id,
      amount: amount,
      plan: plan,
      addcredits: addcredits
    })
  });
  Navigate('/result');

        
    alert("Payment Successful!");
    alert("payment_id: " + response.razorpay_payment_id);
    alert("order_id: " + response.razorpay_order_id);
    alert("signature: " + response.razorpay_signature);
  }

      };
    const rzp = new window.Razorpay(options);
     rzp.open();
     rzp.on('payment.failed', function (response){
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
     
        
});


      
    }
  
  return (
    <div className="min-h-screen bg-[#eefbf5] flex flex-col items-center px-6 py-16">
      {/* Tag */}
      <div className="px-6 py-2 bg-white border rounded-full text-sm text-gray-700 shadow-sm">
        OUR PLANS
      </div>

      {/* Title */}
      <h1 className="text-3xl font-semibold mt-6 mb-10 text-gray-900">
        Choose the plan
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
        {plans.map((p, i) => (
          <div
            key={i}
            className="w-[300px] bg-white rounded-xl shadow-md p-8 border hover:shadow-lg transition-all"
          >
            {/* Icon */}
            <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4">
              <img src={assets.logo_icon} alt="" />
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold text-gray-900 mb-1">{p.name}</h2>
            <p className="text-gray-500 text-sm mb-6">{p.desc}</p>

            {/* Price */}
            <div className="text-3xl font-semibold text-gray-900">
              {p.price}
              <span className="text-sm text-gray-500 font-normal ml-1">
                / {p.credits} credits
              </span>
            </div>

            {/* Button */}
            <button onClick={() =>
            {console.log("credits to be added after payment:", Number(p.credits));
             payNow(p.price.slice(1)*100,Number(p.credits),p.name)}} className="w-full mt-8 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition">
             {user ? "Purchase" : "Get Started"}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}


export default BuyCredits
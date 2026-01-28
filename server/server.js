import express from "express";
import dotenv from 'dotenv'
import router from "./routes/userroutes.js";
import Razorpay from "razorpay";

dotenv.config();
import cors from "cors";
console.log('Dotenv config result:', dotenv.config());
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
import connectDB from "./config/connect.js";

app.use("/api/user", router);

await connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/create-order", async (req, res) => {
  // Logic to create order
  try {
  const rzp = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

  const { amount, currency, receipt, notes } = req.body;  
  // Here, you would typically interact with your payment gateway to create an order
  const order = await rzp.orders.create({
        amount: amount*100, // amount in the smallest currency unit
        currency,
        receipt,
        notes
      });
  res.json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});


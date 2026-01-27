import user from '../models/user.js';
import Transaction from '../models/transactionmodel.js';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

const Registeruserhandler = async (req, res) => {
  const { username, email, password } = req.body; 
    if (!username || !email || !password){
        return res.status(400).json({ message: "Please provide all required fields" });     
    }   

    try {
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exist please login" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await user.create({
            name: username,
            email,
            password: hashedPassword
        });

        const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        res.status(201).json({ token });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
const loginuserhandler = async (req, res) => {
    const { email, password } = req.body;
    console.log(email,password);

    if (!email || !password) {
        return res.status(400).json({ message: "Please provide all required fields" });
    }

    try {
        const existingUser = await user.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "User does not exist" });
        }

        
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid pass" });
        }

        const token = jwt.sign({ id: existingUser._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        res.status(200).json({ name: existingUser.name, token });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
const getcredits = async (req, res) => {
    try {
        const userId = req.user.id;
        const existingUser = await user.findById(userId);
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ credits: existingUser.credits, user: existingUser.name });
    } catch (error) {
        console.error("Error fetching credits:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};  
const userimagegeneration = async (req, res) => {
    try {
        const userId = req.user.id;
        const existingUser = await user.findById(userId);
        if(existingUser.credits <= 0){
            return res.status(403).json({ message: "Insufficient credits" });
        }
        const form = new FormData()
form.append('prompt', req.body.prompt);

let response = await fetch('https://clipdrop-api.co/text-to-image/v1', {
  method: 'POST',
  headers: {
    'x-api-key': process.env.CLIPDROP_API_KEY,
  },
  body: form,
})
const buffer = await response.arrayBuffer();
//  res.set({
//       "Content-Type": "image/png",
//       "Content-Length": buffer.byteLength,
//     });
    const imageUrl = `data:image/png;base64,${Buffer.from(buffer).toString('base64')}`;
  
    existingUser.credits -= 1;
        await existingUser.save();
        return res.status(200).json({ message: "Image generated successfully", 
            credits: existingUser.credits, imageUrl });

    } catch (error) {
        console.error("Error in image generation:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
const transactionhandler = async (req, res) => {
    try {
        const userId = req.user.id;
        const { orderId,plan,amount,addcredits } = req.body;
        const addtransaction = await Transaction.create({
            userId,
            orderId,    
            plan,
            amount,
            addcredits
        });

        const existingUser = await user.findById(userId);
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }
        existingUser.credits += addcredits;
        await existingUser.save();
        return res.status(200).json({ message: "Transaction recorded successfully", credits: existingUser.credits });
    }   
    catch (error) {
        console.error("Error recording transaction:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

     export { Registeruserhandler, loginuserhandler, getcredits, userimagegeneration , transactionhandler}; 
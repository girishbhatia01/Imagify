import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const verifyUser = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "no token received" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "token is not valid" });
        }
        req.user = decoded;
        console.log(decoded);
        
        next();
    });
};

export default verifyUser;

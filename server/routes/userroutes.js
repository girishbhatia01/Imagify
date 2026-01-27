import express from 'express';
import { Registeruserhandler,loginuserhandler, getcredits ,userimagegeneration,transactionhandler} from '../controllers/usercontroller.js';
import verifyUser from '../middleware/verifyuser.js';

const router = express.Router();

router.post('/register', Registeruserhandler);
router.post('/login', loginuserhandler);
//protected routes
router.get('/getcredits', verifyUser, getcredits);
router.post('/imagegeneration', verifyUser, userimagegeneration);
router.post('/transaction', verifyUser, transactionhandler);

export default router;
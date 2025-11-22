import { Router } from "express";
import { register, login , users, logOut, verifyAuth} from "../controllers/userControllers.js";
import {verifyAccessToken} from '../middlewares/verifyToken.js'

const router = Router();

router.post("/register", register);
router.post('/login',login);
router.post('/logout',logOut);

router.get('/', verifyAccessToken, users);
router.get('/auth', verifyAccessToken, verifyAuth);

export default router;

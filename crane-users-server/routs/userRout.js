import { Router } from "express";
import {
  register,
  login,
  users,
  logOut,
  verifyAuth,
  userInfo,
  userLicense,
} from "../controllers/userControllers.js";
import { verifyAccessToken } from "../middlewares/verifyToken.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logOut);

router.get("/info", verifyAccessToken, userInfo);
router.get("/license", verifyAccessToken, userLicense);
router.get("/auth", verifyAccessToken, verifyAuth);

export default router;

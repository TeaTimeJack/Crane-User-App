import { Router } from "express";
import {
  addFillerPost,
  removeFillerPost,
  getAllPosts,
  getUserPosts,
} from "../controllers/fillerPostsControllers.js";
import { verifyAccessToken } from "../middlewares/verifyToken.js";

const router = Router();

router.get("/", getAllPosts);

router.post("/add", verifyAccessToken, addFillerPost);
router.delete("/remove", verifyAccessToken, removeFillerPost);
router.get("/myposts", verifyAccessToken, getUserPosts);


export default router;

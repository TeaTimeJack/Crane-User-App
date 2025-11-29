import { Router } from "express";
import {
  addFillerPost,
  removeFillerPostById,
  getAllPosts,
  getUserPosts,
  togglefoundById
} from "../controllers/fillerPostsControllers.js";
import { verifyAccessToken } from "../middlewares/verifyToken.js";

const router = Router();

router.get("/", getAllPosts);

router.post("/add", verifyAccessToken, addFillerPost);
router.delete("/remove/:id", verifyAccessToken, removeFillerPostById);
router.get("/myposts", verifyAccessToken, getUserPosts);
router.put("/togglefound/:id", togglefoundById);


export default router;

import {
  addPost,
  removePostById,
  getPostsByUserId,
  getPostsBycertificete,
  getPostsByDate,
  getAllfillerPosts,
  togglefound
} from "../models/fillerPostsModel.js";
import { config } from "dotenv";

config();

export const addFillerPost = async (req, res) => {
  const {
    start_date,
    end_date,
    work_hours,
    place,
    certification_needed,
    crane_type,
    payment,
    extra_comments
  } = req.body;

  try {
    const post = await addPost(
        req.user.userid,
        start_date,
        end_date,
        work_hours,
        place,
        certification_needed,
        crane_type,
        payment,
        extra_comments
    );

    res.status(201).json({ message: "The Post Was Posted successfully", post });
  } catch (error) {
    res.status(500).json({ message: "internall error" });
  }
};

export const removeFillerPostById = async (req, res)=>{
    try {
        const { id } = req.params;
       await removePostById(id);
       res.json({message:"Your Post Was Deleted"})
    } catch (error) {
        console.log("error=>", error);
        res.status(500).json({ message: "internall error" });
    }
}

export const getAllPosts = async (req, res) => {
  try {
    const posts = await getAllfillerPosts();
    res.json(posts);
  } catch (error) {
    console.log("error=>", error);
    res.status(500).json({ message: "internall error" });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const theUserPosts = await getPostsByUserId(req.user.userid);
    res.json(theUserPosts);
  } catch (error) {
    console.log("error=>", error);
    res.status(500).json({ message: "internall error" });
  }
};

export const togglefoundById = async (req, res) =>{
  try {
    const { id } = req.params;
      await togglefound(id);
       res.json({message:"Your found Was toggled"})
  } catch (error) {
    console.log("error=>", error);
        res.status(500).json({ message: "internall error" });
  }
}

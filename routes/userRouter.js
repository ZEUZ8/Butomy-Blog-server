import express from "express";


import { signup,login, getBlogs ,addBlog,getUserBlogs,updateSingleBlog,deleteBlog} from "../controller/userController.js"
import { userAuth } from "../middleware/auth.js";
const router = express.Router();


router.get("/",getBlogs)
router.post("/login", login);
router.post("/register", signup);

router.get("/blogs",userAuth,getBlogs)
router.post("/blog",userAuth,addBlog)

//get user blogs for manipulation
router.get("/blogs/:id",userAuth,getUserBlogs)
router.put("/edit",userAuth,updateSingleBlog)
router.delete("/blog/:id", userAuth, deleteBlog);

export default router;
import express from "express";


import { signup,login, getBlogs ,addBlog,getUserBlogs,updateSingleBlog} from "../controller/userController.js"
import { userAuth } from "../middleware/auth.js";
const router = express.Router();


router.get("/",getBlogs)
router.post("/login", login);
router.post("/register", signup);

router.get("/blogs",getBlogs)
router.post("/blog",addBlog)

//get user blogs for manipulation
router.get("/blogs/:id",getUserBlogs)
router.put("/edit",updateSingleBlog)

export default router;
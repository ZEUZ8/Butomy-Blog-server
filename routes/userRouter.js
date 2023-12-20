import express from "express"

import { userAuth } from "../middleware/auth"

const router = express.Router()

router.get("/",getBlogs)
router.post("/login",login)

export default router
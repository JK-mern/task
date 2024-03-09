import express from "express"
import { sellerSignup, userSignup } from "../controllers/auth.controller.js"

const router = express.Router()


router.post("/signupUser",userSignup)
router.post("/signupSeller",sellerSignup)


export default router
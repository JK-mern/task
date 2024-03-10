import express from "express"
import { sellerLogin, sellerSignup, userLogin, userSignup } from "../controllers/auth.controller.js"

const router = express.Router()


router.post("/signupUser",userSignup)
router.post("/signupSeller",sellerSignup)
router.post("/userLogin",userLogin)
router.post("/sellerLogin",sellerLogin)


export default router
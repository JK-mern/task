import express from "express"
import { sellerLogin, sellerSignup, signOut, userLogin, userSignup } from "../controllers/auth.controller.js"

const router = express.Router()


router.post("/signupUser",userSignup)
router.post("/signupSeller",sellerSignup)
router.post("/userLogin",userLogin)
router.post("/sellerLogin",sellerLogin)
router.post('/signOut', signOut)


export default router
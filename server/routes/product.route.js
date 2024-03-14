import express from 'express'
import { addProduct } from '../controllers/product.controller.js'

const router = express.Router()


router.post('/addProduct',addProduct)


export default router
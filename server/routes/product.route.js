import express from 'express'
import { addProduct, featuredProduct, normalProducts, sortProducts } from '../controllers/product.controller.js'

const router = express.Router()


router.post('/addProduct',addProduct)
router.get ('/featuredProduct', featuredProduct)
router.get('/normalProduct', normalProducts)
router.get("/sort/:category",sortProducts)


export default router
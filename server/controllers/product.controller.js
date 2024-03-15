import Product from "../models/Product.model.js";
import { errorHandler } from "../utils/error.js";

export const addProduct = async (req, res, next) => {
  try {
    const { name } = req.body;
    const product = await Product.findOne({ name });
    if (product) {
      return next(errorHandler(409, "Product already Present"));
    } else {
      const newProduct = new Product(req.body);
      await newProduct.save();
      res.status(200).json("Product added successfully");
    }
  } catch (error) {
    next(error);
  }
};


export const featuredProduct = async(rreq, res ,next) =>{
  try {
    const products = await Product.find({featured : true})
    res.status(200).json(products)
  } catch (error) {
    next(error)
  }
}


export const normalProducts = async(req,res,next) =>{
  try {
    const products = await Product.find({featured : false})
    res.status(200).json(products)
  } catch (error) {
    next(error)
  }
}

export const sortProducts = async(req,res,next) =>{
  try {
    
      const searchby = req.params.category;
      console.log(searchby);
  
      let query = {}; 
  
      if (searchby && searchby !== 'all') {
      
        query.category = searchby;
      }

      query.featured = { $ne: true };
  
      const products = await Product.find(query);
      res.status(200).json(products);

  } catch (error) {
    next(error)
  }
}

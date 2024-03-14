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

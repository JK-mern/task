import mongoose from "mongoose"

const productSchema= new  mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true,
    },
    description : {
        type : String,
        required : true,
    },
    featured : {
        type : Boolean,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    category : {
        type :String,
        required : true
    }

},{timestamps : true})

const Product =  mongoose.model("Product", productSchema)
export default Product
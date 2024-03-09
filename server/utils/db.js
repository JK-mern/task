import mongoose from "mongoose";

const connectDb = async () => {
  await mongoose.connect(process.env.DATABASE);
  console.log("Connected to Database sucessfully");
};

export default connectDb;

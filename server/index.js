import express from "express"
import dotenv from "dotenv"
import connectDb from "./utils/db.js"
import  authRouter from "./routes/auth.route.js"
import productRoute from './routes/product.route.js'

dotenv.config()

const app = express()
app.use(express.json())

connectDb()


app.use ("/api/auth", authRouter)
app.use('/api/product',productRoute)


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({ success: false, statusCode, message });
  });
  
  

app.listen(process.env.PORT, ()=>{
    console.log(`Server started at port ${process.env.PORT}`)
})


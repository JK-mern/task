import express from "express"
import dotenv from "dotenv"
import connectDb from "./utils/db.js"
import  authRouter from "./routes/auth.route.js"

dotenv.config()

const app = express()
app.use(express.json())

connectDb()


app.use ("/api/auth", authRouter)

app.listen(process.env.PORT, ()=>{
    console.log(`Server started at port ${process.env.PORT}`)
})


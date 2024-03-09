import express from "express"
import dotenv from "dotenv"
import connectDb from "./utils/db.js"

dotenv.config()

const app = express()

connectDb()

app.listen(process.env.PORT, ()=>{
    console.log(`Server started at port ${process.env.PORT}`)
})
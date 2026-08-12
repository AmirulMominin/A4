import express from "express"
import { json } from "node:stream/consumers"
import cors from "cors"
import cookieParser from "cookie-parser"
import config from "./config"



const app = express()

app.get('/',(req,res)=>{
    res.send("This is it")
})
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
    origin: config.app_url,
    credentials: true
}))






export default app
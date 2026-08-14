import express from "express"
import { json } from "node:stream/consumers"
import cors from "cors"
import cookieParser from "cookie-parser"
import config from "./config"
import { authRoute } from "./modules/auth/auth.route"
import { propertiesRouter } from "./modules/properties/properties.route"



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

app.use('/api/auth', authRoute)
app.use('/api/landlord', propertiesRouter)





export default app
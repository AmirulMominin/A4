import express, { NextFunction, Request, Response } from "express"
import { json } from "node:stream/consumers"
import cors from "cors"
import cookieParser from "cookie-parser"
import config from "./config"
import { authRoute } from "./modules/auth/auth.route"
import { landloardRoute } from "./modules/landloard/landloard.route"
import { propertiesRoute } from "./modules/properties/properties.route"
import { rentalRoute } from "./modules/rental/rental.route"
import { paymentRoute } from "./modules/payment/payment.route"
import { stripe } from "./lib/stripe"
import { reviewRoute } from "./modules/review/review.route"
import { adminRoute } from "./modules/admin/admin.route"
import httpstatus from "http-status"
import { globalError } from "./middleware/globalError"

const app = express()

app.get('/',(req,res)=>{
    res.send("This is it")
})
// const endpointSecret = config.stripe_webhook
app.use('/api/payments/confirm', express.raw({type: 'application/json'}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
    origin: config.app_url,
    credentials: true
}))

app.use('/api/auth', authRoute)
app.use('/api/landlord', landloardRoute)
app.use('/api/properties', propertiesRoute)
app.use('/api/rentals', rentalRoute)
app.use('/api/payments', paymentRoute)
app.use('/api/review', reviewRoute)
app.use('/api/admin',adminRoute)

app.use((req,res)=>{
    res.status(404).json({
        message: "Route not found!",
        path: req.originalUrl
    })
})

app.use(globalError)




export default app
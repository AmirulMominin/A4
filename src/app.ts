import express from "express"
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





export default app
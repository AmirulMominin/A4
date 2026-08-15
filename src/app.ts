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
const endpointSecret = config.stripe_webhook
app.use('/api/payments/confirm', express.raw({type: 'application/json'}), (request, response)=>{
let event = request.body;
  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse
  if (endpointSecret) {
    // Get the signature sent by Stripe
    const signature = request.headers['stripe-signature']!;
    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        signature,
        endpointSecret
      );
    } catch (err:any) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return response.sendStatus(400);
    }
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
      // Then define and call a method to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntent);
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
})

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
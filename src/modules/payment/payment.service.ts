import config from "../../config"
import { prisma } from "../../lib/prisma"
import { stripe } from "../../lib/stripe"

const createPayment = async(uid: string, rid: string)=>{

    const rental = await prisma.rental.findUnique({
        where: {
            id: rid
        },
        include:{
            property: true,
            payment: true
        }
    })

    // console.log(rid, rental?.tenantId)

    if(rental?.rentalStatus !== "APPROVE"){
        throw new Error("You can not pay for this. The status in not approved")
    }
    if(rental.tenantId !== uid){
        throw new Error("This is not your rental request, you can not pay for this")
    }

    const user = await prisma.user.findUnique({
        where:{
            id:uid
        }
    })
    let stripeCustomerId = user?.stripeCustomerId

    if(!stripeCustomerId){
        const customer =  await stripe.customers.create({
            name: user?.name,
            email: user?.email,
            metadata: {userId : user?.id as string}

        })
        stripeCustomerId = customer.id
    }

    const session = await stripe.checkout.sessions.create({
        line_items:[{
            price_data:{
                currency: "usd",
                product_data:{
                    name: rental.property.name,
                    description: rental.property.details 
                },
                unit_amount: Math.round(rental.property.rent.toNumber() * 100)
            },
            quantity: 1
        }],
        customer: stripeCustomerId,
        mode: "payment",
        payment_method_types: ["card"],
        metadata: {
            rentalId: rental.id,
            tenantId: rental.tenantId
        },
         payment_intent_data: {
        metadata: {
            rentalId: rental.id,
            tenantId: rental.tenantId,
        },
    },

        success_url: "http://localhost/3000/success",
        cancel_url: "http://localhost/3000/cancel"
    })

    return {
        paymentUrl : session.url,
        sessionId: session.id
    }

}

const webhook = async(payLoad:Buffer, signature: string)=>{
    const event = stripe.webhooks.constructEvent(
        payLoad,
        signature,
        config.stripe_webhook
      );
      console.log(event)
    switch (event.type) {
    case 'checkout.session.completed':
      console.log(event.data.object)
      // Then define and call a method to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntent);
      break;
      case 'customer.subscription.updated':
      
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    case 'customer.subscription.deleted':
      
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    default:
      // Unexpected event type

      console.log(`Unhandled event type ${event.type}.`);
  }
   
}



export const paymentService = {
    createPayment,
    webhook
}
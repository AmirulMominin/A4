import Stripe from "stripe"
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
    // let stripeCustomerId = user?.stripeCustomerId

    // if(!stripeCustomerId){
    //     const customer =  await stripe.customers.create({
    //         name: user?.name,
    //         email: user?.email,
    //         metadata: {userId : user?.id as string}

    //     })
    //     stripeCustomerId = customer.id
        // await prisma.user.update({
        //     where:{
        //         id: uid
        //     },
        //     data:{
        //         stripeCustomerId: uid
        //     }
        // })
    // }

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
    switch (event.type) {
    case 'checkout.session.completed':
      console.log("line 98",event.data.object)
      const session = event.data.object

      const userId = session.metadata?.tenantId as string

      console.log("103",userId)
      const rentalId = session.metadata?.rentalId as string
      const customerId = session.customer
        // if(session.amount_total === null){
        //     throw new Error("You amount is 0")
        // }
    //   const amount = session.amount_total / 100
      
      const result = await prisma.payment.create({
        data:{
            amount: Number(session.amount_total) / 100,
            userId: userId,
            rentalId: rentalId,
            paymentStatus: "PAID"
            
        }
      })
      if(result){
        await prisma.rental.update({
            where:{
                id: rentalId
            },
            data:{
                rentalStatus: "ACTIVE"
            }
        })
      }
    //   console.log("line 116")

    //   console.log("line number 117",result)
      
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

const allPayments = async(uid: string)=>{
    const get = await prisma.payment.findMany({
        where:{
            id: uid
        },
        include:{
            rental: true,
            
        }
    })

    return get
}

const getPaymentDetails = async(id : string)=>{
    const paymentDetails = await prisma.payment.findUnique({
        where:{
            id
        },
        include:{
            rental: {
                include:{
                    property: true,
                    tenant: {
                        omit:{
                            password: true
                        }
                    }
                }
            }
        }
    })
    if(!paymentDetails){
        throw new Error("Can not find the data")
    }
    
    return paymentDetails
}



export const paymentService = {
    createPayment,
    webhook,
    allPayments,
    getPaymentDetails
}
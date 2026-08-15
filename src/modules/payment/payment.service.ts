import { prisma } from "../../lib/prisma"
import { stripe } from "../../lib/stripe"

const createPayment = async(uid: string, rid: string)=>{

    const rental = await prisma.rental.findUnique({
        where: {
            id: rid
        },
        include:{
            property: true
        }
    })

    console.log(rid, rental?.tenantId)

    if(rental?.rentalStatus !== "APPROVE"){
        throw new Error("You can not pay for this. The status in not approved")
    }
    if(rental.tenantId !== uid){
        throw new Error("This is not your rental request, you can not pay for this")
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
        mode: "payment",
        payment_method_types: ["card"],
        metadata: {
            rentalId: rid,
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

const webhook = async()=>{

}



export const paymentService = {
    createPayment,
    webhook
}
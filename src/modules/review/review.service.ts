import { prisma } from "../../lib/prisma"

const giveReview = async(rentalId: string,review: string,rating: number)=>{

    const rental = await prisma.rental.findUnique({
        where:{
            id: rentalId
        },
        include:{
            property: true
        }
    })
    if(rental?.rentalStatus !== "ACTIVE"){
        throw new Error("You can not give review as its not active")
    }

    const result = await prisma.review.create({
        data:{
            rentalId: rental.id,
            propertyId: rental.propertyId,
            review: review,
            rating: rating
        }
    })

    return result

}


export const reviewService = {
    giveReview
}
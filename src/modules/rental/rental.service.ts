import { prisma } from "../../lib/prisma"

const requestRental = async(uid: string, pid: string)=>{
    console.log(uid, pid)
const property = await prisma.properties.findUnique({
    where:{
        id: pid
    }
})

if(property?.status  !== "AVAILABLE"){
    throw new Error("This property is not available for rent")
}

const data = await prisma.rental.create({
    data:{
        tenantId: uid,
        propertyId: pid
    }
})

return data

}



const getAllRequest = async(id: string)=>{
    const data = await prisma.rental.findMany({
        where:{
            tenantId: id
        }
    })

    return data
}

const getRentalRequestDetails = async(uid: string, rid: string)=>{
    const rental = await prisma.rental.findUnique({
        where:{
            id: rid
        },
        include: {
            tenant: {
                omit:{
                    password: true
                }
            },
            property: true
        }
    })

    if(rental?.tenantId !== uid){
        throw new Error("This is not your rental request id.You have not request any rental for this property. You can not see this")
    }
    return rental
}

export const rentalService = {
    requestRental,
    getAllRequest,
    getRentalRequestDetails
}
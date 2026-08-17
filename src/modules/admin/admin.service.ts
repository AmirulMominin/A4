import { prisma } from "../../lib/prisma"

const getAllUser = async()=>{
    const users = await prisma.user.findMany({omit:{password: true}}
    )
    return users
}

const getAllProperties = async()=>{
    const properties = await prisma.properties.findMany()
    return properties
}


const getAllRentalRequest = async()=>{
    const rentalRequest = await prisma.rental.findMany()
    return rentalRequest
}
export const adminService = {
    getAllUser,
    getAllProperties,
    getAllRentalRequest
}
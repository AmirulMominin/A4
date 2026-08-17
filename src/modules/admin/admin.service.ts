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

const updateUserStatus = async(id : string, status: string)=>{
    const user = await prisma.user.findUnique({
        where:{
            id
        }
    })
    if(!user){
        throw new Error("User not found")
    }
    const result = await prisma.user.update({
        where: {
            id
        },
        data:{
            status: "BANNED"
        }
    })

    return result

}

export const adminService = {
    getAllUser,
    getAllProperties,
    getAllRentalRequest,
    updateUserStatus
}
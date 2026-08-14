
import { prisma } from "../../lib/prisma";
import { IProperties } from "./landloard.interface";
import { RentalStatus } from "../../../prisma/generated/prisma/enums";

const createProperties = async(payLoad: IProperties, id: string) =>{
    const propertiesPost = await prisma.properties.create({
        data: {
            ...payLoad,landlordId:id
        }
    })

    return propertiesPost
}


const updateProperties = async(payLoad: any, uid: string, pid: string) =>{
    console.log("line 16",payLoad)
    const user = await prisma.user.findUniqueOrThrow({
        where:{
            id: uid
        }
    })
    if(!user){
        throw new Error("No user found")
    }
    const properties = await prisma.properties.findUniqueOrThrow({
        where:{
            id: pid,
            landlordId: uid
        }
    })

    if(!properties){
        throw new Error("You are not the owner")
    }

    const data = await prisma.properties.update({
        where:{
            id: pid
        },
        data:
            payLoad
        
    })
    return data
}

const deleteProperties = async(pid: string, uid: string)=>{
    const properties = await prisma.properties.findUnique({
        where:{
            id: pid,
            landlordId: uid
        }
    })

    if(!properties){
        throw new Error("You are not the owner of this properties. So you can not delete this")
    }
    const data = await prisma.properties.delete({
        where:{
            id: pid
        }
    })
    return data
}

const getAllRequest = async(id :string)=>{
    const data = await prisma.rental.findMany({
        where:{
            property: {
                landlordId: id
            }
        },
        include:{
            property: true,
            tenant: {
                omit:{
                    password: true
                }
            }
        }
    
    })
    return data
}


const requestProcess = async(status: string, id: string, lid: string)=>{

    const property = await prisma.rental.findFirst({
        where:{
            id,
            property:{
                landlordId: lid
            }
        }
    })
    if(!property){
        throw new Error("rental request not found or you are not authorized to make this change")
    }

    if(property.rentalStatus !== "PENDING"){
        throw new Error("Only pending status can be change")
    }

    const data = await prisma.rental.update({
        where:{
            id
        },
        data:{
            rentalStatus: status as RentalStatus
        }
    })


}

export const landloardService = {
    createProperties,
    updateProperties,
    deleteProperties,
    getAllRequest,
    requestProcess
}
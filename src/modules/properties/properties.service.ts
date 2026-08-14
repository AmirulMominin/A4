import { prisma } from "../../lib/prisma"

const getAllProperties =  async()=>{
    const properties = await prisma.properties.findMany({})
    return properties
}

const getPropertiesById = async(id: string)=>{
    const data = await prisma.properties.findUnique({
        where:{
            id
        }
    })

    return data
}

const getAllCategory = async () =>{
    const category = await prisma.category.findMany({
        select:{
            name: true
        }
    })
    return category
}

export const propertiesService = {
    getAllProperties,
    getAllCategory,
    getPropertiesById
}
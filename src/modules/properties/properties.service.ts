import { prisma } from "../../lib/prisma"
import { IPropertiesQuery } from "./properties.interface"

const getAllProperties =  async(query : IPropertiesQuery)=>{

    console.log(query.type)
    console.log(query.location)
    const limit = query.limit ? Number(query.limit) : 10
    const page = query.page ? Number(query.page) : 1
    const skip = (page - 1) * limit

    const sortBy = query.sortBy ? query.sortBy : "createdAt"
    const sortOrder = query.sortOrder ? query.sortOrder : "desc"

    const properties = await prisma.properties.findMany({
        where: {
            AND:[
                {
                    OR:[
                        {
                            details : {
                                contains: query.searchTerm,
                                mode : "insensitive"
                            }
                        },
                        {
                            name: {
                                contains: query.searchTerm,
                                mode: "insensitive"
                            }
                        },
                        
                    ]
                },
                {
                    location: query.location,

                },
                {
                    rent: query.rent,
                },
                {
                    type: query.type
                }
            ]
        },
        take: limit,
        skip: skip,
        orderBy: {
        [sortBy]: sortOrder
},
        
    })


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
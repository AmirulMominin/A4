import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { propertiesService } from "./properties.service";

const getAllProperties = catchAsync(async(req, res, next)=>{
    const properties = await propertiesService.getAllProperties()
    sendResponse(res, {
        success: true,
        statusCoode: 200,
        message: "Here is all the properties",
        data: properties
    })
})

const getAllCategory = catchAsync(async(req, res, next)=>{
    const data = await propertiesService.getAllCategory()
    sendResponse(res,{
        success: true,
        statusCode: 200,
        message: "All the category",
        data: data
    })
})


const getPropertiesById = catchAsync(async(req, res, next)=>{
    const id = req.params.id
    const data = await propertiesService.getPropertiesById(id as string)
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Here is the data",
        data: data
    })
})

export const propertiesController = {
    getAllCategory,
    getAllProperties,
    getPropertiesById
}
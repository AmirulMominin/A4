import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

import httpStatus  from "http-status";
import { userInfo } from "node:os";
import { landloardService } from "./landloard.service";

const createProperties = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    
    if(!req.user){
        throw new Error("user is not authneticated! ")
    }
    
    const {role, id} = req.user
    if(role !== "Landlord"){
        throw new Error("You can not create a property")
    }
    const payLoad = req.body

    const result = await landloardService.createProperties(req.body, id)
    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Property created for rent",
        data: result
    })
})


const updateProperties = catchAsync(async(req, res, next)=>{

    const id = req.user?.id
    const propertiesId = req.params.id
    
    const data = await landloardService.updateProperties(req.body, id as string, propertiesId as string)
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Properties updated",
        data: data
    })
})


const deleteProperties = catchAsync(async(req, res, next)=>{
    const pid = req.params.id
    const uid = req.user?.id
    const data = await landloardService.deleteProperties(pid as string, uid as string)
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Properties deleted!",
        data: data
    })
})

export const landloardController = {
    createProperties,
    updateProperties,
    deleteProperties
}
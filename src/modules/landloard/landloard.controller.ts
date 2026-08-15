import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

import httpStatus  from "http-status";
import { userInfo } from "node:os";
import { landloardService } from "./landloard.service";
import { RentalStatus } from "../../../prisma/generated/prisma/enums";

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

const viewAllRequest = catchAsync(async(req, res, next)=>{
    const id = req.user?.id
    const data = await landloardService.getAllRequest(id as string)
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Here is all the data",
        data: data
    })
})

const requestProcess = catchAsync(async(req, res, next)=>{
    const {status} = req.body
    
    const id = req.params.id
    const lid = req.user?.id

    if(!["APPROVE", "REJECT"].includes(status)){
        throw new Error("Invalid status input.")
    }

    const data = await landloardService.requestProcess(status, id as string, lid as string)
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "message updated",
        data: data
    })
})

export const landloardController = {
    createProperties,
    updateProperties,
    deleteProperties,
    viewAllRequest,
    requestProcess
}
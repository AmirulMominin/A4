import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { rentalService } from "./rental.service";
import httpStatus from "http-status"
const requestRental = catchAsync(async(req, res, next)=>{
    const pid = req.body.propertyId
    const role = req.user?.role
    const id = req.user?.id
    if(role !== "Tenant"){
        throw new Error("You are not able to request for rent")
    }
    const data = await rentalService.requestRental(id as string, pid)
    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Rent request send",
        data: data
    })
})

const getAllRequest = catchAsync(async(req,res,next)=>{
    const id = req.user?.id

    const data = await rentalService.getAllRequest(id as string)
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Here is your rent requests",
        data: data
    })
})

const rentalRequestDetails = catchAsync(async(req, res, next) =>{
    const uid = req.user?.id
    const rid = req.params.id

    const data = await rentalService.getRentalRequestDetails(uid as string, rid as string)
    sendResponse(res, {
        success: true,
        message: "Here is all the data",
        statusCode: 200,
        data: data
    })
})

export const rentalController = {
    requestRental,
    getAllRequest,
    rentalRequestDetails
}
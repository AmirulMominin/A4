import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { adminService } from "./admin.service";

const getAllUser = catchAsync(async(req, res, next)=>{
    const data = await adminService.getAllUser()
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "All the users",
        data: data
    })
})

const getAllProperties = catchAsync(async(req, res, next)=>{
    const properties = await adminService.getAllProperties()
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Here is all the properties",
        data: properties
    })
})

const getAllRentalRequest = catchAsync(async(req, res, next)=>{
    const rentalRequest = await adminService.getAllRentalRequest()
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Here is all the rental request",
        data: rentalRequest
    })
})

const updateUserStatus = catchAsync(async(req, res, next)=>{
    const id = req.params.id
    const status = req.body.status

    const result = await adminService.updateUserStatus(id as string, status as string)
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Status updated",
        data: result
    })

})

export const adminController = {
    getAllUser,
    getAllProperties,
    getAllRentalRequest,
    updateUserStatus
}
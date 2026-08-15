import { Role } from "../../../prisma/generated/prisma/enums";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { paymentService } from "./payment.service";

const createPayment = catchAsync(async(req,res, next)=>{

    const uid = req.user?.id
    const rid = req.body.rentalId
    const role = req.user
    console.log(role, uid)
    // if(role !== Role.Tenant){
    //     throw new Error("You are not Tenant, you can not rent this property")
    // }

    const data = await paymentService.createPayment(uid as string, rid as string)
    sendResponse(res, {
        success: true,
        message: "Payment",
        statusCode: 200,
        data: data
    })
})

const webhook = catchAsync(async(req, res, next)=>{

})

export const paymentController = {
    createPayment,
    webhook
}
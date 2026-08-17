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
    const event = req.body as Buffer
    const signature = req.headers['stripe-signature'] as string

    await paymentService.webhook(event, signature)

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Webhook",
        data: null
    })
})


const payment = catchAsync(async(req, res, next)=>{
    const uid= req.user?.id

    const allPayments = await paymentService.allPayments(uid as string)
    sendResponse(res, {
        success: true,
        message: "Here is all the payment history",
        statusCode: 200,
        data: allPayments
    })
})

const getPaymentDetails = catchAsync(async(req, res, next)=>{
    const id = req.params?.id
    console.log(id)

    const details = await paymentService.getPaymentDetails(id as string)

    sendResponse(res,{
        success: true,
        message: "Detail for the payment",
        statusCode: 200,
        data: details
    })
})


export const paymentController = {
    createPayment,
    webhook,
    payment,
    getPaymentDetails
}
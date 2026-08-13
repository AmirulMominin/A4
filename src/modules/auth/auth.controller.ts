import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { authService } from "./auth.service";
import httpStatus  from "http-status";

const userRegister = catchAsync(async(req,res,next)=>{
    const result = await authService.createUser(req.body)
    
    // res.cookie("accessToken", result)
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "User Created",
        data: result
    })
    
})


const userLogin = catchAsync(async(req,res, next)=>{
   const result =  await authService.userLogin(req.body)
   const {accessToken} = result
   res.cookie("accessToken", accessToken,{
    httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24
   })
   sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "You have logged in successfully",
    data: result

   })
})

const userDetails = catchAsync(async(req, res, next)=>{
    const user = req.user
    const result = await authService.userDetails(user)
   sendResponse(res,{
    success: true,
    statusCode: httpStatus.OK,
    message: "User details found",
    data: result
   })
    

})

export const authController = {
    userRegister,
    userLogin,
    userDetails
}
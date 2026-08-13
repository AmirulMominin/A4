import { Response } from "express";

export const sendResponse = (res: Response, data:any) =>{
    return res.status(data.statusCode).json({
        success: data.success,
        statusCode: data.statusCode,
        message: data.message,
        data: data.data
    })
}
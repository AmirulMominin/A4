import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { reviewService } from "./review.service";
const giveReview = catchAsync(async(req, res, next)=>{
    const rentalId = req.body.rentalId
    const review = req.body.review
    const rating = req.body.rating
    const result = await reviewService.giveReview(rentalId,review,rating)
    sendResponse(res,{
        success: true,
        statusCode: 201,
        message: "Review Created",
        data: result
    })
})

export const reviewController = {
    giveReview
}
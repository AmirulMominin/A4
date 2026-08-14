import { Role } from "../../prisma/generated/prisma/enums";
import config from "../config";
import { prisma } from "../lib/prisma";
import { catchAsync } from "../utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken"


// declare global {
//     namespace Express {
//         interface Request {
//             user?: {
//                 email: string;
//                 name: string;
//                 id: string;
//                 role: Role;
//             }
//         }
//     }
// }


const auth = (...role: string[]) =>{
    return catchAsync(async(req, res, next)=>{
        const accessToken = req.cookies.accessToken

        if(!accessToken){
            throw new Error('Please login to see this page')
        }
        const verify = jwt.verify(accessToken, config.accessTokenSecret) as JwtPayload
        const {id, email, role} = verify
        const user = await prisma.user.findUnique({
            where:{
                id,
                email
            }
        })
        if(!user){
            throw new Error("This user is not found")
        }
       
        if(!role.length && role.includes(role)){
            throw new Error("You are not allowed to visit this link")
        }

        req.user = {
            name: user.name,
            email: user.email,
            role: user.role,
            id: user.id
        }
        next()

    })
}

export default auth
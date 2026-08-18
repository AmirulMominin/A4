import bcrypt from "bcryptjs"
import { prisma } from "../../lib/prisma"
import { ILogin, IUser } from "./auth.interface"
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken"
import config from "../../config"
const createUser = async(payLoad: IUser)=>{
    const {name, email, password, role} = payLoad
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = await prisma.user.create({
        data: {
            name,
            email,
            role,
            password: hashedPassword
        },
        omit:{
            password: true
        }
    })
    return user
}

const userLogin = async(payLoad: ILogin)=>{
    const {email, password} = payLoad
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            email
        }
    })
    if(!user) {
        throw new Error("There are no user by this email. Register Please")
    }
    const verifyPasssword = await bcrypt.compare(password, user.password)
    if(!verifyPasssword){
        throw new Error("Wrong password")
    }
    const jwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    }

    const accessToken = jwt.sign(jwtPayload, config.accessTokenSecret, {expiresIn: config.accessExpire} as SignOptions)
    return {accessToken}
}

const userDetails = async(user: IUser)=>{
    const {id, email,role} = user
    const result = await prisma.user.findUniqueOrThrow({
        where:{
            email,
            id,
            role
        },
        omit:{
            password: true
        }
    })

    return result
}


export const authService = {
    createUser,
    userLogin,
    userDetails
}
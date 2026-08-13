import { Role, UserStatus } from "../../../prisma/generated/prisma/enums"

export interface IUser {
    id ?: string
    name: string
    role: Role
    email: string
    password: string
    status: UserStatus
}

export interface ILogin {
    email: string,
    password: string
}
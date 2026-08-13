import { Router } from "express";
import { authController } from "./auth.controller";
import auth from "../../middleware/auth";
import { Role } from "../../../prisma/generated/prisma/enums";


const route = Router()

route.post('/register', authController.userRegister)

route.post('/login', authController.userLogin)

route.get('/me',auth(Role.Admin, Role.Landlord, Role.Tenant), authController.userDetails)

export const authRoute = route 
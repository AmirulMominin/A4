import { Router } from "express";
import { adminController } from "./admin.controller";
import auth from "../../middleware/auth";
import { Role } from "../../../prisma/generated/prisma/enums";

const router = Router()

router.get('/users',auth(Role.Admin),adminController.getAllUser)
router.get('/properties', auth(Role.Admin), adminController.getAllProperties)
router.get('/rentals', auth(Role.Admin),adminController.getAllRentalRequest)


export const adminRoute = router
import { Router } from "express";
import { paymentController } from "./payment.controller";
import auth from "../../middleware/auth";
import { Role } from "../../../prisma/generated/prisma/enums";

const router = Router()

router.post('/create',auth(Role.Tenant), paymentController.createPayment)

export const paymentRoute = router
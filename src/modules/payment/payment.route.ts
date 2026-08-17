import { Router } from "express";
import { paymentController } from "./payment.controller";
import auth from "../../middleware/auth";
import { Role } from "../../../prisma/generated/prisma/enums";

const router = Router()

router.post('/create',auth(Role.Tenant), paymentController.createPayment)
router.post('/confirm', paymentController.webhook)
router.get('/',auth(Role.Tenant), paymentController.payment)
router.get('/:id', auth(Role.Tenant), paymentController.getPaymentDetails)

export const paymentRoute = router
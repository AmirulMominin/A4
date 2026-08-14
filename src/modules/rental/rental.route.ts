import { Router } from "express";
import { rentalController } from "./rental.controller";
import auth from "../../middleware/auth";
import { Role } from "../../../prisma/generated/prisma/enums";

const router = Router()

router.post('/',auth(Role.Tenant), rentalController.requestRental)
router.get('/', auth(Role.Tenant), rentalController.getAllRequest)
router.get('/:id', auth(Role.Tenant), rentalController.rentalRequestDetails)

export const rentalRoute = router
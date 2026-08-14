import { Router } from "express";
import { Role } from "../../../prisma/generated/prisma/enums";
import auth from "../../middleware/auth";
import { landloardController } from "./landloard.controller";

const router = Router()

router.post('/properties',auth(Role.Landlord), landloardController.createProperties)
router.get('/properties/requests', auth(Role.Landlord), landloardController.viewAllRequest)
router.patch('/properties/requests/:id', auth(Role.Landlord), landloardController.requestProcess)
router.put('/properties/:id', auth(Role.Landlord), landloardController.updateProperties)
router.delete('/properties/:id', auth(Role.Landlord), landloardController.deleteProperties)




export const landloardRoute = router
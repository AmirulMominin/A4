import { Router } from "express";
import { propertiesController } from "./properties.controller";
import { Role } from "../../../prisma/generated/prisma/enums";
import auth from "../../middleware/auth";

const router = Router()

router.post('/properties',auth(Role.Landlord), propertiesController.createProperties)
router.put('/properties/:id', auth(Role.Landlord), propertiesController.updateProperties)
router.delete('/properties/:id', auth(Role.Landlord), propertiesController.deleteProperties)



export const propertiesRouter = router
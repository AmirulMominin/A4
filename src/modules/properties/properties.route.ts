import { Router } from "express";
import { propertiesController } from "./properties.controller";

const router = Router()

router.get('/', propertiesController.getAllProperties)
router.get('/:id', propertiesController.getPropertiesById)
router.get('/categories', propertiesController.getAllCategory)

export const propertiesRoute = router
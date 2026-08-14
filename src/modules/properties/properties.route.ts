import { Router } from "express";
import { propertiesController } from "./properties.controller";

const router = Router()

router.get('/', propertiesController.getAllProperties)
router.get('/categories', propertiesController.getAllCategory)
router.get('/:id', propertiesController.getPropertiesById)

export const propertiesRoute = router
import { Router } from "express";
import { createTrain, getTrains, updateTrain } from "../controllers/train.controller";
import { protect } from "../middlewares/auth.middleware";
import { searchBetweenStations } from "../controllers/search.controller";

const router = Router();

router.get('/', getTrains)
router.get('/all-trains', searchBetweenStations)
router.post('/new-train', protect, createTrain)
router.post('/update-train/:id', protect, updateTrain)

export default router
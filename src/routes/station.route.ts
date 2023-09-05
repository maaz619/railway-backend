import { Router } from "express";
import { protect } from "../middlewares/auth.middleware";
import { addTrainToStation, craeteStation, getAllStation, updateStation } from "../controllers/station.controller";

const router = Router()

router.use(protect)
router.get('/', getAllStation)
router.post('/create', craeteStation)
router.post('/update/:id', updateStation)
router.post('/add/:id', addTrainToStation)

export default router
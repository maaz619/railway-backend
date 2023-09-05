import { Router } from "express";
import { deleteMe, login, me, register } from "../controllers/user.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.delete('/remove-me/', protect, deleteMe)
router.get('/me', protect, me)


export default router
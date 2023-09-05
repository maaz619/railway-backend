import { bookTicket, cancelTicket, getAllTickets } from "../controllers/booking.controller";
import { Router } from "express";
import { protect } from "../middlewares/auth.middleware";

const router = Router()

router.use(protect)
router.get("/", getAllTickets)
router.post("/book", bookTicket);
router.post("/cancel", cancelTicket);

export default router
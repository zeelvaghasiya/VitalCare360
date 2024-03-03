import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { bookAppointment } from "../controllers/appointment.controller.js";

const router = Router();

//secured routes
router.route("/book-appointment").post(verifyJWT, bookAppointment);

export default router;

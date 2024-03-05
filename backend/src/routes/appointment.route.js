import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { bookAppointment, getAppointmentById } from "../controllers/appointment.controller.js";

const router = Router();

//secured routes
router.route("/book-appointment").post(verifyJWT, bookAppointment);
router.route("/get-all-appointment").get(verifyJWT, getAppointmentById); // use for patient purpose

export default router;

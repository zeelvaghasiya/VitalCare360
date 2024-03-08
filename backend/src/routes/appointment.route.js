import { Router } from "express";
import { verifyJWT, verifyDoctorJWT } from "../middlewares/auth.middleware.js";
import {
  bookAppointment,
  getAppointmentById,
  getAppointmentByIdForDoctor,
  handleStatusOfAppointment,
} from "../controllers/appointment.controller.js";

const router = Router();

//secured routes
router.route("/book-appointment").post(verifyJWT, bookAppointment);
router.route("/get-all-appointment-patient").get(verifyJWT, getAppointmentById); // use for patient purpose
router.route("/get-all-appointment-doctor").get(verifyDoctorJWT, getAppointmentByIdForDoctor); // use for doctor purpose
router.route("/handle-status/:id").put(verifyDoctorJWT, handleStatusOfAppointment);

export default router;

import { Router } from "express";
import {
  registerDoctor,
  loginDoctor,
  getAllDoctorByCategory,
  logoutDoctor,
  getCurrentDoctor,
  updateDoctorDetails,
  editDoctorInfo,
  getDoctorById
} from "../controllers/doctor.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyDoctorJWT } from "../middlewares/auth.middleware.js";
import {
  addTimeSlot,
  viewAllTimeSlot,
  deleteTimeSlot
} from "../controllers/timeslot.controller.js";

const router = Router();

router.route("/registerdoctor").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  registerDoctor
);

router.route("/login").post(loginDoctor);

router.route("/getAllDoctorByCategory/:diagnosis").get(getAllDoctorByCategory);
router.route("/doctor-details/:id").get(getDoctorById)

//secured routes
router.route("/logout").post(verifyDoctorJWT, logoutDoctor);
router.route("/current-doctor").get(verifyDoctorJWT, getCurrentDoctor);
router.route("/update-doctor-info").put(verifyDoctorJWT, updateDoctorDetails);
router
  .route("/edit-doctor-personal-info")
  .patch(verifyDoctorJWT, editDoctorInfo);
router.route("/add-timeslot").post(verifyDoctorJWT, addTimeSlot);
router.route("/view-all-timeslots").get(verifyDoctorJWT, viewAllTimeSlot);
router.route("/time-slots/:slotId").delete(verifyDoctorJWT, deleteTimeSlot);

export default router;

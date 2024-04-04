import { Router } from "express";
import {
  registerPatient,
  loginPatient,
  logoutPatient,
  refreshAccessToken,
  getCurrentUser,
  updatePatientDetails,
  addAllergy,
  addChronicDisease,
  addInjuries,
  addSurgeries,
  uploadRecords,
} from "../controllers/patient.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  registerPatient
);

router.route("/login").post(loginPatient);

//secured routes
router.route("/logout").post(verifyJWT, logoutPatient);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/update-user-info").put(verifyJWT, updatePatientDetails);
router.route("/add-allergy").patch(verifyJWT, addAllergy);
router.route("/add-chronicdisease").patch(verifyJWT, addChronicDisease);
router.route("/add-injury").patch(verifyJWT, addInjuries);
router.route("/add-surgery").patch(verifyJWT, addSurgeries);
router.route("/upload-record").post(
  verifyJWT,
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  uploadRecords
);

export default router;

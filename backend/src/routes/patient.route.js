import { Router } from "express";
import {
  registerPatient,
  loginPatient,
  logoutPatient,
  refreshAccessToken
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
router.route("/refresh-token").post(refreshAccessToken)

export default router;
import { Router } from "express";
import {
    registerDoctor
  } from "../controllers/doctor.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

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

export default router;
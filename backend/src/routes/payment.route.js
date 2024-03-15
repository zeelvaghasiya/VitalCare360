import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    checkout,
    paymentVerificationAndBookVideoConsult,
    getKey
} from "../controllers/payment.controller.js";

const router = Router();

router.route("/getkey").get(getKey);

//secured routes
router.route("/checkout").post(verifyJWT, checkout);
router.route("/paymentverification-videoconsult").post(verifyJWT, paymentVerificationAndBookVideoConsult);

export default router;

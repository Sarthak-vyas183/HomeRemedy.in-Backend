import { Router } from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js"; // Corrected path

const router = Router();

import {
    get_Vr_Remedies,
    // getRemedy,
     createRemedy,
    // updateRemedy,
    // deleteRemedy
} from "../controllers/RemedyController.js";

router.route("/").get(get_Vr_Remedies).post(verifyJWT, createRemedy);

export default router;
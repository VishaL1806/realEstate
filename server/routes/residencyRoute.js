import express from "express";
import { createUser } from "../controllers/userController.js";
import { createResidency, getAllresidencies, getResidency } from "../controllers/residencyController.js";
import jwtCheck from "../config/auth0Config.js";

const router = express.Router();

router.post("/create",jwtCheck,createResidency)
router.get("/getAllresidencies", getAllresidencies)
router.get("/getResidency/:id", getResidency)


export {router as residencyRoute}



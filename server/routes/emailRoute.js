import express from "express";
import { sendEmail } from "../controllers/emailController.js";

const router = express.Router();

// Endpoint to send an email
router.post("/sendemail", sendEmail);

export default router;
import express from "express";
import { adminLogout, adminRegister, doctorRegister, getAllDoctors, getUserDetail, loginUser, patientLogout, patientRegister } from "../Controller/userController.js";
import { isAdminAuthenticated, isPatientAuthenticated } from "../Middlewares/auth.js";

const router = express.Router();

router.post("/patient/register", patientRegister);

router.post("/admin/register", isAdminAuthenticated, adminRegister);

router.post("/doctor/register",isAdminAuthenticated, doctorRegister)

router.post("/login", loginUser);

router.get("/doctors", getAllDoctors)

router.get("/admin/me", isAdminAuthenticated, getUserDetail)
router.get("/patient/me", isPatientAuthenticated, getUserDetail)

router.get("/admin/logout", isAdminAuthenticated, adminLogout)
router.get("/patient/logout", isPatientAuthenticated, patientLogout)

export default router;

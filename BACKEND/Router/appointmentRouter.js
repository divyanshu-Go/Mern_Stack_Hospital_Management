import express from "express"
import { createAppointment, deleteAppointment, getAllAppointments, updateAppointment } from "../Controller/appointmentController.js";
import { isAdminAuthenticated, isPatientAuthenticated } from "../Middlewares/auth.js";

const Router = express.Router();

Router.post("/create",isPatientAuthenticated, createAppointment)
Router.get("/getAll",isAdminAuthenticated, getAllAppointments)
Router.put("/update/:id",isAdminAuthenticated, updateAppointment)
Router.delete("/delete/:id",isAdminAuthenticated, deleteAppointment)

export default Router;
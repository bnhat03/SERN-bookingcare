import express from "express"
import authController from "../controller/authController"
import allcodeController from '../controller/allcodeController'
import userController from "../controller/userController"
import groupController from "../controller/groupController"
import doctorController from "../controller/doctorController"
import scheduleController from "../controller/scheduleController"
import patientController from "../controller/patientController"

import { checkUserJWT, checkUserPermission } from '../middleware/JWTAction'
const router = express.Router();

const initApiRouters = (app) => {

    // MW trước khi vô Controller
    // router.all("*", checkUserJWT, checkUserPermission);

    // Authentication
    router.post("/register", authController.handleRegister)
    router.post("/login", authController.handleLogin)
    router.post("/logout", authController.handleLogout);

    // allcode
    router.get("/allcode", allcodeController.getAllCodes);

    // user routes
    router.get("/user/read", userController.readFunc)
    router.post("/user/create", userController.createFunc)
    router.put("/user/update", userController.updateFunc)
    router.delete("/user/delete", userController.deleteFunc)

    // doctor
    router.get("/doctor/top-doctor-home", doctorController.getTopDoctorHome);
    router.get("/doctor/get-all-doctors", doctorController.getAllDoctors);
    router.post("/doctor/save-infor-doctors", doctorController.postInforDoctor);
    router.get("/doctor/get-detail-doctor-by-id", doctorController.getDetailDoctorById);
    router.get("/doctor/get-extra-infor-doctor-by-id", doctorController.getExtraInforDoctorById); 
    router.get("/doctor/get-profile-doctor-by-id", doctorController.getProfileDoctorById);

    // Schedule
    router.post("/schedule/bulk-create-schedule", scheduleController.bulkCreateSchedule);
    router.get("/schedule/get-schedule-doctor-by-date", scheduleController.getScheduleByDate);

    // Patient
    router.post("/patient/patient-book-appointment", patientController.postBookAppointment);

    app.use("/api/v1/", router);
}
export default initApiRouters;
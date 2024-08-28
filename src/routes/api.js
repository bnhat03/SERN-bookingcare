import express from "express"
import authController from "../controller/authController"
import allcodeController from '../controller/allcodeController'
import userController from "../controller/userController"
import groupController from "../controller/groupController"
import doctorController from "../controller/doctorController"
import scheduleController from "../controller/scheduleController"
import patientController from "../controller/patientController"
import specialtyController from "../controller/specialtyController"
import clinicController from "../controller/clinicController"

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
    router.get("/doctor/get-list-patient-for-doctor", doctorController.getListPatientForDoctor);

    // Schedule
    router.post("/schedule/bulk-create-schedule", scheduleController.bulkCreateSchedule);
    router.get("/schedule/get-schedule-doctor-by-date", scheduleController.getScheduleByDate);

    // Patient
    router.post("/patient/patient-book-appointment", patientController.postBookAppointment);
    router.post("/patient/verify-book-appointment", patientController.postVerifyBookAppointment); // Client nhấn vô link ở email

    // Specialty
    router.post("/specialty/create-new-specialty", specialtyController.createNewSpecialty);
    router.get("/specialty/get-specialty", specialtyController.getAllSpecialties);
    router.get("/specialty/get-detail-specialty-by-id", specialtyController.getDetailSpecialtyById);

    // Clinic
    router.post("/clinic/create-new-clinic", clinicController.createNewClinic);
    router.get("/clinic/get-clinic", clinicController.getAllClinics);
    router.get("/clinic/get-detail-clinic-by-id", clinicController.getDetailClinicById);

    app.use("/api/v1/", router);
}
export default initApiRouters;
import express from "express"
import authController from "../controller/authController"
import allcodeController from '../controller/allcodeController'
import userController from "../controller/userController"
import groupController from "../controller/groupController"
import roleController from "../controller/roleController"
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

    // // user routes
    // router.get("/user/read", userController.readFunc)
    // router.post("/user/create", userController.createFunc)
    // router.put("/user/update", userController.updateFunc)
    // router.delete("/user/delete", userController.deleteFunc)

    // // role routes
    // router.get("/role/read", roleController.readFunc)
    // router.post("/role/create", roleController.createFunc)
    // router.put("/role/update", roleController.updateFunc)
    // router.delete("/role/delete", roleController.deleteFunc)
    // router.get("/role/by-group/:groupId", roleController.getRolesByGroup)
    // router.post("/role/assign-to-group", roleController.assignRolesToGroup)

    // router.get("/group/read", groupController.readFunc)

    app.use("/api/v1/", router);
}
export default initApiRouters;
import express from "express"
import homeController from "../controller/homeController"
import apiController from "../controller/apiController"
const router = express.Router();

/**
 * 
 * @param {*} app: express app
 */
const initWebRouters = (app) => {
    router.get("/", homeController.handleHelloWorld)
    router.get("/user", homeController.handleUserPage)
    router.post("/users/create-user", homeController.handleCreateNewUser)

    router.post("/delete-user/:id", homeController.handleDeleteUser)
    router.post("/update-user/:id", homeController.getUpdateUserPage) // Chuyển hướng trang khi edit
    router.post("/users/update-user", homeController.handleUpdateUser) // Lấy dữ liệu từ form ở trang khác

    // REST api
    // GET - R
    // POST - C
    // PUT - U
    // DELETE - D
    router.get("/api/test-api", apiController.testApi);
    app.use("/", router);
}
export default initWebRouters;
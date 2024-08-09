import express from "express"

/**
 * 
 * @param {*} app: express app
 */
const configViewEngine = (app) => {
    app.use(express.static('./src/public'))
    app.set("view engine", "ejs"); // Sử dụng công nghệ gì để viết code HTML
    app.set("views", "./src/views"); // Nơi lưu trữ view
}

export default configViewEngine;
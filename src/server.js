import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRouters from "./routes/web";
import initApiRouters from "./routes/api";
require("dotenv").config();// Lấy biến .env
import connection from "./config/connectDB";
import configCORS from "./config/cors";
import bodyParse from 'body-parser'
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 8080
const REACT_URL = process.env.REACT_URL || '*'

// config CORS
configCORS(app);


// config view engine
configViewEngine(app);

// config body-parser
// app.use(bodyParse.json())
// app.use(bodyParse.urlencoded({extended: true}))
app.use(bodyParse.json({ limit: '50mb' }))
app.use(bodyParse.urlencoded({ imit: '50mb', extended: true }))

// config cookie-parser
app.use(cookieParser());

//test connection db
connection();

// initWebRouters(app);
initApiRouters(app);

app.listen(PORT, () => {
    console.log(">>> JWT Backend is running on the port:", PORT);
})
import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRouters from "./routes/web";
import initApiRouters from "./routes/api";
require("dotenv").config();// Lấy biến .env
import connection from "./config/connectDB";
import configCORS from "./config/cors";
import bodyParse from 'body-parser'
import cookieParser from "cookie-parser";

// test JWT
// import {createJWT, verifyToken} from './middleware/JWTAction';

const app = express();
const PORT = process.env.PORT || 8080
const REACT_URL = process.env.REACT_URL || '*'

// config CORS
configCORS(app);


// config view engine
configViewEngine(app);

// config body-parser
app.use(bodyParse.json())
app.use(bodyParse.urlencoded({extended: true}))

// config cookie-parser
app.use(cookieParser());

//test connection db
connection();

// test JWT
// createJWT();
// let decodedData = verifyToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQmllbiBWYW4gTmhhdCIsImFkZHJlc3MiOiJIYSBUaW5oIiwiaWF0IjoxNzIyMDUyNTQzfQ.apahapEIOEJlFOB_HQUs14NfQHe9IU_xWZAy7BjbqxM");
// console.log(decodedData);

// init web routes, api routes
initWebRouters(app);
initApiRouters(app);

app.listen(PORT, () => {
    console.log(">>> JWT Backend is running on the port:", PORT);
})
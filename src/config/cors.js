import cors from 'cors'
require("dotenv").config();// Lấy biến .env

const configCORS = (app) => {
    // C1. library cors
    // app.use(cors({
    //     origin: process.env.REACT_URL , 
    //     methods: 'GET,POST,OPTIONS,PUT,PATCH,DELETE',
    //     allowedHeaders: 'X-Requested-With,content-type',
    //     credentials: true,
    // }));

    // C2. middleware
    app.use(function (req, res, next) { // next: middleware
    
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL);
    
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        if (req.method === 'OPTIONS') {
            return res.sendStatus(200);
        }
    
        // Pass to next layer of middleware
        next();
    });
}
export default configCORS;
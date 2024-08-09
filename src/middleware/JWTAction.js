require("dotenv").config();
import jwt from "jsonwebtoken"

const nonSecurePaths = ['/login', '/register', '/logout' ]; // Path bỏ qua MW

// Trả về token của payload(data) truyền vào
const createJWT = (payload) => {
    let key = process.env.JWT_SECRET;
    let token = null;
    try {
        token = jwt.sign(payload, key, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });
    } catch (error) {
        console.log(error);
    }
    return token;
}

// Trả về DATA (payload) của token truyền vào
const verifyToken = (token) => {
    let key = process.env.JWT_SECRET;
    let decoded = null;

    try {
        decoded = jwt.verify(token, key);
    } catch (error) {
        console.log(error);
    }
    return decoded;
}

// video 74: Bearer Token: Lấy token từ Headers.Authorization
const extractToken = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }
    return null;
}


// Middleware 1 trước khi vào controller => Login thành công + Token hợp lệ
const checkUserJWT = (req, res, next) => {
    if (nonSecurePaths.includes(req.path)) return next();

    let cookies = req.cookies;
    let tokenFromHeader = extractToken(req);

    if ((cookies && cookies.jwt) || tokenFromHeader) { // Check cookie nếu người dùng đã nhấn login và login thành công
        let token = cookies.jwt ? cookies.jwt : tokenFromHeader;
        let decoded = verifyToken(token); // payload (data) của token
        if (decoded) { // token hợp lệ
            req.user = decoded; // Middleware tạo một tham số của request là user
                                // Khi vào Controller thì req.user = payload = data
            req.token = token;
            next();
        }
        else {
            return res.status(401).json({ // Login thành công nhưng token sai secret => Ăn cắp token
                EM: 'Not authenticated the user', // Error Message
                EC: -1, // Error Code:
                DT: '' // Data
            })
        }
    }
    else {
        return res.status(401).json({ // Login thất bại
            EM: 'Not authenticated the user',
            EC: -1,
            DT: ''
        })
    }
}

// Middleware 2 trước khi vào controller => Phải qua Middleware 1 trên đạ => Check quyền truy cập route ni
const checkUserPermission = (req, res, next) => {
    if (nonSecurePaths.includes(req.path) || req.path === '/account') return next();

    if (req.user) { // Nếu login thành công với token hợp lệ thì đã tạo ra tham số ni ở MW trên
        // req.user = payloadOfToken
        let email = req.user.email;
        let roles = req.user.groupWithRoles.Roles; // Array
        let currentUrl = req.path; // route đang truy cập hiện tại
        if (!roles || roles.length == 0) {
            return res.status(403).json({ // Ko có quyền truy cập URL ni
                EM: `You don't have the permission to access this link`,
                EC: -1,
                DT: ''
            })
        }
        let canAccess = roles.some(item => item.url === currentUrl || currentUrl.includes(item.url)); // return true nếu một element hợp lệ
                                                                    // req.path = /role/by-group/4 => VIdeo chưa lấy được /role/by-group => Dùng includes ni
        if (canAccess === true) {
            next(); // tiếp đến Controller
        } else { // Ko vào được COntroller => Trả về kết response
            return res.status(403).json({ // Ko có quyền truy cập URL ni
                EM: `You don't have the permission to access this link`,
                EC: -1,
                DT: ''
            })
        }

    }
    else { // Login thất bại hoặc login thành công nhưng token ko hợp lệ (lấy cắp)
        return res.status(401).json({ // Login thất bại
            EM: 'Not authenticated the user',
            EC: -1,
            DT: ''
        })
    }
}

module.exports = {
    createJWT,
    verifyToken,
    checkUserJWT,
    checkUserPermission,

}
// API login, register

import loginRegisterService from "../service/loginRegisterService"


const testApi = (req, res) => {
    return res.status(200).json({
        message: 'ok',
        data: 'test-api'
    })
}
const handleRegister = async (req, res) => {
    try {
        // Missing input
        if(!req.body.email || !req.body.phone || !req.body.password) {
            return res.status(200).json({
                EM: 'Missing required parameters!', // Error Message
                EC: '1', // Error Code:
                                // Success: 0
                                // Fail: -1
                DT: '' // Data
            })
        }
        if (req.body.password && req.body.password.length < 4) {
            return res.status(200).json({
                EM: 'Your password must have more than 3 letters!', // Error Message
                EC: '1', // Error Code:
                DT: '' // Data
            })
        }

        // service: create user
        let data = await loginRegisterService.registerNewUser(req.body); //req.body: object JS
        return res.status(200).json({
            EM: data.EM, // Error Message
            EC: data.EC, // Error Code:
            DT: '' // Data
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server', // Error Message
            EC: '-1', // Error Code:
                            // Success: 0
                            // Fail: -1
            DT: '' // Data
        })
    }
    // console.log(">>> data in request: ", req.body);
}
const handleLogin = async (req, res) => {
    // req.body: objectJS{email/phone, password}
    try {
        let data = await loginRegisterService.handleUserLogin(req.body); // object
        // set cookie: .cookie(name, value, {options})
        if (data && data.DT && data.DT.access_token) {
            res.cookie("jwt", data.DT.access_token, {httpOnly: true, maxAge: 60*60*1000});
                // expires/Max-Age: default = session => Tắt trình duyệt là  (Video 71 đã sửa lại điều kiện IF trên)
        }
        return res.status(200).json({
            EM: data.EM, // Error Message
            EC: data.EC, // Error Code:
            DT: data.DT // Data
        })
    } catch (error) {
        return res.status(500).json({
            EM: 'error from server', // Error Message
            EC: '-1', // Error Code:
        })
    }
}
const handleLogout = async (req, res) => {
    try {
        res.clearCookie("jwt");
        return res.status(200).json({
            EM: 'Clear cookies done!', // Error Message
            EC: 0, // Error Code:
            DT: '' // Data
        })
    } catch (error) {
        return res.status(500).json({
            EM: 'error from server', // Error Message
            EC: '-1', // Error Code:
            DT: ''
        })
    }
}

module.exports = {
    testApi,
    handleRegister,
    handleLogin,
    handleLogout,

}
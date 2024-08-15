// API login, register

import authAPIService from "../service/authAPIService"


const handleRegister = async (req, res) => {
    try {
        // Missing input
        if (!req.body.email || !req.body.phone || !req.body.password) {
            return res.status(200).json({
                EM: 'Missing required parameters!',
                EC: '1',
                // Success: 0
                // Fail: -1
                DT: ''
            })
        }
        if (req.body.password && req.body.password.length < 4) {
            return res.status(200).json({
                EM: 'Your password must have more than 3 letters!',
                EC: '1',
                DT: ''
            })
        }

        // service: create user
        let data = await authAPIService.registerNewUser(req.body); //req.body: object JS
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: ''
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            // Success: 0
            // Fail: -1
            DT: ''
        })
    }
    // console.log(">>> data in request: ", req.body);
}
const handleLogin = async (req, res) => {
    // req.body: objectJS{email, password}
    try {
        let data = await authAPIService.handleUserLogin(req.body); // object
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
        })
    }
}
const handleLogout = async (req, res) => {
    try {
        res.clearCookie("jwt");
        return res.status(200).json({
            EM: 'Clear cookies done!',
            EC: 0,
            DT: ''
        })
    } catch (error) {
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

module.exports = {
    handleRegister,
    handleLogin,
    handleLogout,

}
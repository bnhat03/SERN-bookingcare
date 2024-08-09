// API users
import userAPIService from '../service/userAPIService'


const readFunc = async (req, res) => {
    try {
        if (req.query.page && req.query.limit) {
            let { page, limit } = req.query;
            // page: currentPage
            // limit: items_each_page
            let data = await userAPIService.getUserWithPagination(+page, +limit);
            return res.status(200).json({
                EM: data.EM, // Error Message
                EC: data.EC, // Error Code:
                DT: data.DT // Data
            })
        }
        else {
            let data = await userAPIService.getAllUser();
            return res.status(200).json({
                EM: data.EM, // Error Message
                EC: data.EC, // Error Code:
                DT: data.DT // Data
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server', // Error Message
            EC: '-1', // Error Code:
            DT: '' // Data
        })
    }
}
// modal create user
const createFunc = async (req, res) => {
    try {
        // Chưa validate ??? => Trùng email, phone

        let data = await userAPIService.createNewUser(req.body);
        return res.status(200).json({
            EM: data.EM, // Error Message
            EC: data.EC, // Error Code:
            DT: data.DT // Data
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server', // Error Message
            EC: '-1', // Error Code:
            DT: '' // Data
        })
    }
}
const updateFunc = async (req, res) => {
    try {
        let data = await userAPIService.updateUser(req.body);
        return res.status(200).json({
            EM: data.EM, // Error Message
            EC: data.EC, // Error Code:
            DT: data.DT // Data
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server', // Error Message
            EC: '-1', // Error Code:
            DT: '' // Data
        })
    }
}
const deleteFunc = async (req, res) => {
    try {
        let data = await userAPIService.deleteUser(req.body.id);
        return res.status(200).json({
            EM: data.EM, // Error Message
            EC: data.EC, // Error Code:
            DT: data.DT // Data
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server', // Error Message
            EC: '-1', // Error Code:
            DT: '' // Data
        })
    }
}

// Remove Session Storage
const getUserAccount = async (req, res) => { // Sau khi đã login thành công (MW1), ko cần check quyền URL (MW2)
    return res.status(200).json({
        EM: "ok", // Error Message
        EC: 0, // Error Code:
        DT: {
            access_token: req.token, 
            groupWithRoles: req.user.groupWithRoles,
            email: req.user.email,
            username: req.user.username
        } 
    })
}


module.exports = {
    readFunc, createFunc, updateFunc, deleteFunc, getUserAccount
}
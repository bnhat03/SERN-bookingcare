// API doctor
import doctorAPIService from '../service/doctorAPIService'




const getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let data = await doctorAPIService.getTopDoctorHome(+limit);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

const getAllDoctors = async (req, res) => {
    try {
        let data = await doctorAPIService.getAllDoctors();
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}
const postInforDoctor = async (req, res) => {
    try {
        let data = await doctorAPIService.saveDetailInforDoctor(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}
const getDetailDoctorById = async (req, res) => {
    try {
        let infor = await doctorAPIService.getDetailDoctorById(req.query.id);
        return res.status(200).json({
            EM: infor.EM,
            EC: infor.EC,
            DT: infor.DT
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}



// // modal create user
const createFunc = async (req, res) => {
    try {
        // Chưa validate ??? => Trùng email, phone

        let data = await userAPIService.createNewUser(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}
const updateFunc = async (req, res) => {
    try {
        let data = await userAPIService.updateUser(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}
const deleteFunc = async (req, res) => {
    try {
        let data = await userAPIService.deleteUser(req.query.id);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}



// // Remove Session Storage
// const getUserAccount = async (req, res) => { // Sau khi đã login thành công (MW1), ko cần check quyền URL (MW2)
//     return res.status(200).json({
//         EM: "ok",
//         EC: 0,
//         DT: {
//             access_token: req.token,
//             groupWithRoles: req.user.groupWithRoles,
//             email: req.user.email,
//             username: req.user.username
//         }
//     })
// }


module.exports = {
    getTopDoctorHome,
    getAllDoctors,
    postInforDoctor,
    getDetailDoctorById,
    // createFunc,
    // readFunc,
    // updateFunc, 
    // deleteFunc, 
    // getUserAccount
}
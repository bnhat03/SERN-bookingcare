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
const getExtraInforDoctorById = async (req, res) => {
    try {
        let infor = await doctorAPIService.getExtraInforDoctorByIdService(req.query.doctorId);
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
const getProfileDoctorById = async (req, res) => {
    try {
        let infor = await doctorAPIService.getProfileDoctorByIdService(req.query.doctorId);
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


module.exports = {
    getTopDoctorHome,
    getAllDoctors,
    postInforDoctor,
    getDetailDoctorById,
    getExtraInforDoctorById,
    getProfileDoctorById,

}
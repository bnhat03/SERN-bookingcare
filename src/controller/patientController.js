// API patient(User)

import patientAPIService from "../service/patientAPIService"
const postBookAppointment = async (req, res) => {
    try {
        let data = await patientAPIService.postBookAppointmentService(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server',
            EC: -1,
            DT: ''
        })
    }
}

const postVerifyBookAppointment = async (req, res) => {
    try {
        let data = await patientAPIService.postVerifyBookAppointmentService(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server',
            EC: -1,
            DT: ''
        })
    }
}

module.exports = {
    postBookAppointment,
    postVerifyBookAppointment,

}
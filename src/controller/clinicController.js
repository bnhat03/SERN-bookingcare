import clinicService from '../service/clinicService'

let createNewClinic = async (req, res) => {
    try {
        let data = await clinicService.createNewClinic(req.body);
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
const getAllSpecialties = async (req, res) => {
    try {
        let data = await clinicService.getAllSpecialties();
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

const getDetailClinicById = async (req, res) => {
    try {
        let infor = await clinicService.getDetailClinicById(req.query.id, req.query.location);
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
    createNewClinic,
    // getAllSpecialties,
    // getDetailClinicById,

}
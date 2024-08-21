// API doctor
import scheduleService from '../service/scheduleService'

const bulkCreateSchedule = async (req, res) => {
    try {
        let infor = await scheduleService.bulkCreateScheduleService(req.body);
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
let getScheduleByDate = async (req, res) => {
    try {
        let infor = await scheduleService.getScheduleByDateService(req.body.doctorId, req.body.date);
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
    bulkCreateSchedule,
    getScheduleByDate,

}
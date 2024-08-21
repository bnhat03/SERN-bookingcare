// API schedule
import db from "../models";
require('dotenv').config();
import _ from 'lodash'

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

const bulkCreateScheduleService = async (dataSchedule) => {
    try {
        if (!dataSchedule || !dataSchedule.doctorId || !dataSchedule.formatedDate) {
            return {
                EM: 'Missing params!',
                EC: 1,
                DT: [],
            }
        }
        else {
            let schedule = dataSchedule.arrSchedule;
            if (schedule && schedule.length > 0) {
                schedule = schedule.map((item, index) => {
                    item.maxNumber = MAX_NUMBER_SCHEDULE;

                    return item;
                })
            }
            // get all existing schedule có: DoctorId + date => Tìm ra các row KTG của Doctor trong ngày đó
            let existing = await db.Schedule.findAll({
                where: {
                    doctorId: dataSchedule.doctorId,
                    date: dataSchedule.formatedDate
                },
                attributes: ['timeType', 'date', 'doctorId', 'maxNumber'],
                raw: true,
            })

            // compare different: Tìm ra các KTG của bác sĩ trong ngày nớ truyền xuống mà chưa có trong DB => Lưu vô array ni
            let toCreate = _.differenceWith(schedule, existing, (a, b) => {
                return a.timeType === b.timeType && +a.date === +b.date; // string vs integer
            })

            // create data
            if (toCreate && toCreate.length > 0) {
                await db.Schedule.bulkCreate(toCreate); // Có hàm ni luôn à??? =? Quên hết mẹ rồi
            }

            return {
                EM: 'Save information schedule successfully.',
                EC: 0,
                DT: ''
            }
        }
    } catch (error) {
        console.log(error);
        return {
            EM: 'something wrongs with service!',
            EC: 1,
            DT: []
        }
    }
}

const getScheduleByDateService = async (doctorId, date) => {
    try {
        if (!doctorId || !date) {
            return {
                EM: 'Missing params!',
                EC: 1,
                DT: [],
            }
        }

        let dataSchedule = await db.Schedule.findAll({
            where: {
                doctorId: doctorId,
                date: date + ''
            },
            include: [
                {
                    model: db.AllCode, // PK
                    as: 'timeTypeData',
                    attributes: ['valueEn', 'valueVi']
                },
            ],
            raw: false,
            nest: true
        })
        if (!dataSchedule) dataSchedule = [];
        return {
            EM: 'Get all schedules by doctorId + date succeed!',
            EC: 0,
            DT: dataSchedule
        }
    } catch (error) {
        console.log(error);
        return {
            EM: 'something wrongs with service!',
            EC: 1,
            DT: []
        }
    }
}

module.exports = {
    bulkCreateScheduleService,
    getScheduleByDateService,

}
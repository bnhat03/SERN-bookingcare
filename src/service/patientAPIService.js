import db from "../models";
require('dotenv').config();

const postBookAppointmentService = async (data) => {
    try {
        console.log(">>> check data: ", data);
        if (!data || !data.email || !data.doctorId || !data.timeType || !data.date) {
            return {
                EM: 'Missing params!',
                EC: 1,
                DT: [],
            }
        }
        else {
            // upsert patient (User)
            let user = await db.User.findOrCreate({
                where: { email: data.email },
                defaults: {
                    email: data.email,
                    roleId: 'R3'
                }
            })
            if (user && user[0]) { // create a booking record
                await db.Booking.findOrCreate({
                    where: { patientId: user[0].id },
                    defaults: {
                        statusId: 'S1',
                        doctorId: data.doctorId,
                        patientId: user[0].id,
                        date: data.date,
                        timeType: data.timeType
                    }
                })
            }
            return {
                EM: 'Save information patient successfully.',
                EC: 0,
                DT: ''
            }
        }
    } catch (error) {
        console.log(error);
        return {
            EM: 'something wrongs with service!',
            EC: -1,
            DT: []
        }
    }
}

module.exports = {
    postBookAppointmentService,

}
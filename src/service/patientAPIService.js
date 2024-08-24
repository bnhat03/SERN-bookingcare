import db from "../models";
require('dotenv').config();
import emailService from './emailService'

const postBookAppointmentService = async (data) => {
    try {
        console.log(">>> check data: ", data);
        if (!data || !data.email || !data.doctorId || !data.timeType || !data.date  || !data.fullName) {
            return {
                EM: 'Missing params!',
                EC: 1,
                DT: [],
            }
        }
        else {
            // send Email
            await emailService.sendSimpleEmail({
                receiverEmail: 'nhatbien2003@gmail.com', // data.emailReceiver
                patientName: data.fullName,
                time: data.timeString,
                doctorName: data.doctorName,
                language: data.language,
                redirectLink: 'https://www.youtube.com/watch?v=0GL--Adfqhc&list=PLncHg6Kn2JT6E38Z3kit9Hnif1xC_9VqI&index=97'
            })

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
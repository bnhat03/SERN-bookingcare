import db from "../models";
require('dotenv').config();
import emailService from './emailService'
import {v4 as uuidv4 } from 'uuid';


let buildUrlEmail = (doctorId, token) => {
    let result = `${process.env.REACT_URL}/verify-booking?token=${token}&doctorId=${doctorId}`;
    return result;
}
const postBookAppointmentService = async (data) => {
    try {
        if (!data || !data.email || !data.doctorId || !data.timeType || !data.date  || !data.fullName) {
            return {
                EM: 'Missing params!',
                EC: 1,
                DT: [],
            }
        }
        else {
            // send Email
            let token = uuidv4();
            await emailService.sendSimpleEmail({
                receiverEmail: 'nhatbien2003@gmail.com', // data.emailReceiver
                patientName: data.fullName,
                time: data.timeString,
                doctorName: data.doctorName,
                language: data.language,
                redirectLink: buildUrlEmail(data.doctorId, token)
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

const postVerifyBookAppointmentService = async (data) => {
    try {
        if (!data || !data.token || !data.doctorId) {
            return {
                EM: 'Missing params!',
                EC: 1,
                DT: [],
            }
        }
        else {           
            let appointment = await db.Booking.findOne({
                where: { 
                    doctorId: data.doctorId, 
                    token: data.token,
                    statusId: 'S1'
                },
                raw: false,
            })

            if (appointment) { // update
                appointment.statusId = 'S2';
                await appointment.save();
            }
            return {
                EM: 'Update the appointment successfully.', // status: S1 -> S2
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
    postVerifyBookAppointmentService,

}

// API schedule
import db from "../models";
require('dotenv').config();
import _ from 'lodash'
import { Buffer } from 'buffer'

const createNewClinic = async (data) => {
    try {
        if (!data.name || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown || !data.address) {
            return {
                EM: 'Missing params!',
                EC: 1,
                DT: [],
            }
        }
        else {
            await db.Clinic.create({
                name: data.name,
                address: data.address,
                image: data.imageBase64,
                descriptionHTML: data.descriptionHTML,
                descriptionMarkdown: data.descriptionMarkdown
            })

            return {
                EM: 'Save information Clinic successfully.',
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
const getAllClinics = async () => {
    try {
        let clinics = await db.Clinic.findAll({});
        if (clinics && clinics.length > 0) {
            clinics.map(item => {
                item.image = Buffer(item.image, 'base64').toString('binary');  // convert image (BLOB => Buffer) trước khi gửi sang React (base64)
            })
        }
        return {
            EM: 'Get all clinics successfully!',
            EC: 0,
            DT: clinics
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
let getDetailClinicById = async (inputId) => {
    try {
        if (!inputId) {
            return {
                EM: 'Missing required parameter!',
                EC: 1,
                DT: [],
            }
        }

        else {
            let data = await db.Clinic.findOne({
                where: {
                    id: inputId
                },
                attributes: ['name', 'address', 'descriptionHTML', 'descriptionMarkdown'],
                raw: true
            })
            if (data) {
                let doctorClinic = [];
                doctorClinic = await db.Doctor_Infor.findAll({
                    where: { clinicId: inputId },
                    attributes: ['doctorId', 'provinceId'],
                    raw: true
                })
                data.doctorClinic = doctorClinic;
            }
            else data = {};
            return {
                EM: 'Find this clinic succeed!',
                EC: 0,
                DT: data
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
module.exports = {
    createNewClinic,
    getAllClinics,
    getDetailClinicById,

}
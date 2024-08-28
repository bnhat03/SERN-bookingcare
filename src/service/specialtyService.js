
// API schedule
import db from "../models";
require('dotenv').config();
import _ from 'lodash'
import { Buffer } from 'buffer'

const createNewSpecialty = async (data) => {
    try {
        if (!data.name || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown) {
            return {
                EM: 'Missing params!',
                EC: 1,
                DT: [],
            }
        }
        else {
            await db.Specialty.create({
                name: data.name,
                image: data.imageBase64,
                descriptionHTML: data.descriptionHTML,
                descriptionMarkdown: data.descriptionMarkdown
            })

            return {
                EM: 'Save information Specialty successfully.',
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
const getAllSpecialties = async () => {
    try {
        let specialties = await db.Specialty.findAll({});
        if (specialties && specialties.length > 0) {
            specialties.map(item => {
                item.image = Buffer(item.image, 'base64').toString('binary');  // convert image (BLOB => Buffer) trước khi gửi sang React (base64)
            })
        }
        return {
            EM: 'Get all specialties successfully!',
            EC: 0,
            DT: specialties
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
let getDetailSpecialtyById = async (inputId, location) => {
    try {
        console.log('>>> check detail inputId', inputId);
        if (!inputId || !location) {
            return {
                EM: 'Missing required parameter!',
                EC: 1,
                DT: [],
            }
        }

        else {
            console.log('>>> check detail inputId', inputId);
            let data = await db.Specialty.findOne({
                where: {
                    id: inputId
                },
                attributes: ['descriptionHTML', 'descriptionMarkdown'],
                raw: true
            })
            if (data) {
                let doctorSpecialty = [];
                if (location === 'ALL') {
                    doctorSpecialty = await db.Doctor_Infor.findAll({
                        where: { specialtyId: inputId },
                        attributes: ['doctorId', 'provinceId'],
                        raw: true
                    })

                    // console.log('>>> check detail doctorSpecialty', doctorSpecialty);
                }
                else {
                    doctorSpecialty = await db.Doctor_Infor.findAll({
                        where: {
                            specialtyId: inputId,
                            provinceId: location
                        },
                        attributes: ['doctorId', 'provinceId'],
                        raw: true,

                    })
                }
                data.doctorSpecialty = doctorSpecialty;
            }
            else data = {};
            return {
                EM: 'Find this specialty succeed!',
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
    createNewSpecialty,
    getAllSpecialties,
    getDetailSpecialtyById,

}
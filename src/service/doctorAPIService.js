// Mục đích: API users
import db from "../models";
import { Buffer } from 'buffer';
const getTopDoctorHome = async (limitInput) => { // Lấy list limit Doctor tạo sau cùng
    try {
        let doctors = await db.User.findAll({
            limit: limitInput,
            where: { roleId: 'R2' },
            order: [
                ['createdAt', 'DESC'] // Doctor mô tạo sau thì hiện trước
            ],
            attributes: {
                exclude: ['password']
            },
            include: [ // Nối với bảng PK (AllCode)
                { model: db.AllCode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                { model: db.AllCode, as: 'genderData', attributes: ['valueEn', 'valueVi'] }
            ],
            raw: true,
            nest: true
        })
        if (doctors) {
            return {
                EM: 'get data successfully!',
                EC: 0,
                DT: doctors
            }
        } else {
            return {
                EM: 'get data successfully!',
                EC: 0,
                DT: []
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
const getAllDoctors = async () => {
    try {
        let doctors = await db.User.findAll({
            where: { roleId: 'R2' },
            attributes: {
                exclude: ['password', 'image']
            },
        })
        return {
            EM: 'Get all roles successfully!',
            EC: 0,
            DT: doctors
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
const saveDetailInforDoctor = async (inputDataMd) => { // create data markdown & HTML doctor
    try {
        if (!inputDataMd || !inputDataMd.contentHTML || !inputDataMd.contentMarkdown || !inputDataMd.action) {
            return {
                EM: 'Missing params!',
                EC: 1,
                DT: [],
            }
        }
        else {
            if (inputDataMd.action === "CREATE") {
                await db.Markdown.create({
                    contentHTML: inputDataMd.contentHTML,
                    contentMarkdown: inputDataMd.contentMarkdown,
                    description: inputDataMd.description,
                    doctorId: inputDataMd.doctorId,
                })
            } else if (inputDataMd.action === "EDIT") {
                // sequelize update
                let doctorMarkdown = await db.Markdown.findOne({
                    where: { doctorId: inputDataMd.doctorId },
                    raw: false,
                })
                if (doctorMarkdown) {
                    doctorMarkdown.contentHTML = inputDataMd.contentHTML;
                    doctorMarkdown.contentMarkdown = inputDataMd.contentMarkdown;
                    doctorMarkdown.description = inputDataMd.description;
                    await doctorMarkdown.save();
                }
            }
            return {
                EM: 'Save information doctor successfully.',
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
let getDetailDoctorById = async (inputId) => { // inputId: doctorId
    try {
        if (!inputId) {
            return {
                EM: 'Missing required parameter!',
                EC: 1,
                DT: [],
            }
        }
        else {
            let doctor = await db.User.findOne({
                where: {
                    id: inputId
                },
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Markdown, attributes: ['contentHTML', 'contentMarkdown', 'description'] }, // FK
                    { model: db.AllCode, as: 'positionData', attributes: ['valueEn', 'valueVi'] } // PK
                ],
                raw: false, // Giữ nguyên sequelize object
                nest: true
            })
            if (doctor && doctor.image) {
                doctor.image = Buffer(doctor.image, 'base64').toString('binary'); // Convert BLOB => Buffer => base64 trước khi res -> React
            }
            if (!doctor) doctor = {}
            return {
                EM: 'Find this doctor succeed!',
                EC: 0,
                DT: doctor
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
    getTopDoctorHome,
    getAllDoctors,
    saveDetailInforDoctor,
    getDetailDoctorById,
}
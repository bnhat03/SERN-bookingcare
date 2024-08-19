// Mục đích: API users
import db from "../models";

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
        if (!inputDataMd || !inputDataMd.contentHTML || !inputDataMd.contentMarkdown) {
            return {
                EM: 'Missing params!',
                EC: 1,
                DT: [],
            }
        }
        else {
            await db.Markdown.create({
                contentHTML: inputDataMd.contentHTML,
                contentMarkdown: inputDataMd.contentMarkdown,
                description: inputDataMd.description,
                doctorId: inputDataMd.doctorId,
            })
            return {
                EM: 'Save information doctoc successfully.',
                EC: 0,
                DT: doctors
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

}
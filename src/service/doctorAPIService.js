// Mục đích: API users
import db from "../models";

const getTopDoctorHome =  async (limitInput) => { // Lấy list limit Doctor tạo sau cùng
    try {
        let doctors = await db.User.findAll({
            limit: limitInput,
            where: { roleId: 'R2'},
            order: [
                ['createdAt', 'DESC'] // Doctor mô tạo sau thì hiện trước
            ],
            attributes: {
                exclude: ['password']
            },
            include: [ // Nối với bảng PK (AllCode)
                {model: db.AllCode, as: 'positionData', attributes: ['valueEn', 'valueVi']},
                {model: db.AllCode, as: 'genderData', attributes: ['valueEn', 'valueVi']}
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

module.exports = {
    getTopDoctorHome,

}
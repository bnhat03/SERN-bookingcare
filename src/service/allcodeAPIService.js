import db from "../models";
const getAllCodes = async (typeInput) => { // type: USERS, PRICE, PAYMENT, PROVINCE
    try {
        if(!typeInput) {
            return {
                EM: 'Missing required parameters!',
                EC: 1,
                DT: ''
            }
        }
        else {
            let res = {};
            let allCodes = await db.AllCode.findAll({
                where: {type: typeInput}
            })
            return {
                EM: 'Get all roles successfully!',
                EC: 0,
                DT: allCodes
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
    getAllCodes,

}
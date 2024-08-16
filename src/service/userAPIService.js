// Mục đích: API users
import db from "../models";
import { hashUserPassword, checkEmailExist, checkPhoneExist } from "./authAPIService"

const getAllUsers = async () => {
    try {
        let users = await db.User.findAll({
            attributes: ["id", "username", "email", "phone", "sex"],
            include: { model: db.Group, attributes: ["name", "description"] },
        })
        if (users) {
            return {
                EM: 'get data successfully!',
                EC: 0,
                DT: users
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

// Create
const createNewUser = async (rawUserData) => {
    try {
        // check email/phonenumber are exist 
        let isEmailExist = await checkEmailExist(rawUserData.email);
        if (isEmailExist === true) {
            return {
                EM: 'The email is already exist',
                EC: 1,
                DT: '' 
            }
        }
        //hash user password
        let hashPassword = hashUserPassword(rawUserData.password);
        await db.User.create({ ...rawUserData, password: hashPassword }) // rawUserData: Object
        return {
            EM: 'create a new user ok!',
            EC: 0,
            DT: []
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
const updateUser = async (data) => {
    try {
        if (!data.groupId) { // Chưa hiểu check ni lắm vì luôn có groupId rồi mà
            return {
                EM: 'error with empty GroupId!',
                EC: 1,
                DT: 'group' // Hiện viền đỏ
            }
        }
        let user = await db.User.findOne({
            where: { id: data.id }
        })
        if (user) {
            await user.update({
                username: data.username,
                address: data.address,
                sex: data.sex,
                groupId: data.groupId,
            })
            return {
                EM: 'update user succeeds!',
                EC: 0,
                DT: ''
            }
        }
        else { // Not found user
            return {
                EM: 'This user not founds!',
                EC: 2,
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
const deleteUser = async (userId) => {
    try {
        let user = await db.User.findOne({
            where: { id: userId }
        })
        if (user) {
            await user.destroy();
            return {
                EM: 'Delete the user successfully!',
                EC: 0,
                DT: []
            }
        }
        else {
            return {
                EM: 'User is not exist!',
                EC: 2,
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
    createNewUser,
    // getAllUsers,
    // updateUser,
    // deleteUser,
    // getUserWithPagination,

}
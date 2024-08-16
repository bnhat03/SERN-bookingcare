// Mục đích: API users
import db from "../models";
import { hashUserPassword, checkEmailExist, checkPhoneExist } from "./authAPIService"

const getAllUsers = async () => {
    try {
        let users = await db.User.findAll({
            attributes: {
                exclude: ['password']
            }
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
        await db.User.create({
            ...rawUserData,
            password: hashPassword,
            image: rawUserData.avatar
        }) // rawUserData: Object
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
        if (!data.id || !data.roleId || !data.positionId || !data.gender) {
            return {
                EM: 'Missing required parameters!',
                EC: 2,
                DT: ''
            }
        }
        let user = await db.User.findOne({
            where: { id: data.id }
        })
        if (user) {
            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.address = data.address;
            user.phonenumber = data.phonenumber;
            user.gender = data.gender;
            user.roleId = data.roleId;
            user.positionId = data.positionId;
            if (data.avatar) { // Nếu nhấn thay đổi file avatar ở React (Ko thì giữ nguyên image này)
                user.image = data.avatar;
            }
            await user.save();
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
    getAllUsers,
    updateUser,
    deleteUser,
    // getUserWithPagination,

}
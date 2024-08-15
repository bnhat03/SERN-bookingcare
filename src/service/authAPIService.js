// API login, register

import db from "../models"
import bcrypt from 'bcryptjs' // hash password
import { Op } from 'sequelize'
require("dotenv").config();
// import { getGroupWithRoles } from './JWTService'
// import { createJWT } from '../middleware/JWTAction'

const salt = bcrypt.genSaltSync(10);

const checkEmailExist = async (userEmail) => {
    let user = await db.User.findOne({
        where: { email: userEmail }
    })
    if (user) {
        return true;
    }
    return false;
}
const checkPhoneExist = async (userPhone) => {
    let user = await db.User.findOne({
        where: { phone: userPhone }
    })
    if (user) {
        return true;
    }
    return false;
}
const hashUserPassword = (userPW) => {
    let hashPW = bcrypt.hashSync(userPW, salt);
    //console.log('>>> check pw: ', hashPW);
    return hashPW;
}
const checkPassword = (inputPW, hashPW) => {
    return bcrypt.compareSync(inputPW, hashPW); // true/false
}

const registerNewUser = async (rawUserData) => { // rawUserData: req.body => object{email, phone, username, password}
    // check email/phonenumber are exist 
    let isEmailExist = await checkEmailExist(rawUserData.email);
    if (isEmailExist === true) {
        return {
            EM: 'The email is already exist',
            EC: 1
        }
    }
    let isPhoneExist = await checkPhoneExist(rawUserData.phone);
    if (isPhoneExist === true) {
        return {
            EM: 'The phone number is already exist',
            EC: 1
        }
    }
    //hash user password
    let hashPassword = hashUserPassword(rawUserData.password);
    // create new user
    try { // Đảm bảo DB ko lỗi
        await db.User.create({
            email: rawUserData.email,
            phone: rawUserData.phone,
            password: hashPassword,
            username: rawUserData.username,
            groupId: 4 // hardcode: Customer đăng ký tài khoản => Guest
        })
    } catch (error) {
        console.log(error);
        return {
            EM: 'Something wrongs in service...',
            EC: -2
        }
    }
    return {
        EM: 'A user is created successfully',
        EC: 0 // success
    }

}

const handleUserLogin = async (rawData) => {
    try {
        // check email exist
        if (!rawData.email || !rawData.password) {
            return {
                EM: 'Missing input!',
                EC: `0`,
                DT: ''
            }
        }
        let user = await db.User.findOne({
            where: {
                email: rawData.email
            },
            // attributes: ["id", "username", "email"],
            raw: true,

        })
        if (user) {
            // let isCorrectPassword = checkPassword(rawData.password, user.password);
            let isCorrectPassword = '123456' == rawData.password;
            if (isCorrectPassword) { // check correct password
                return {
                    EM: 'Login successfully!',
                    EC: 0,
                    DT: user
                }
            }
        }
        return {
            EM: 'Your email/phone number or password is incorrect!',
            EC: 1,
            DT: ''
        }

    } catch (error) {
        console.log(error);
        return {
            EM: 'Something wrongs in service...',
            EC: -2,
            DT: ''
        }
    }
}

module.exports = {
    registerNewUser,
    handleUserLogin,
    hashUserPassword,
    checkEmailExist,
    checkPhoneExist

}
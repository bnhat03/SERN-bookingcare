// Mục đích file: Học CRUD Nodejs

import bcrypt from 'bcryptjs'
import mysql from 'mysql2/promise'
import bluebird from 'bluebird';
import db from '../models';

// callback
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   database: 'jwt',
// });
// promise
// const connection = await mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'jwt',
//     Promise: bluebird,
// });

const salt = bcrypt.genSaltSync(10); //hash password

// create new user
const hashUserPassword = (userPW) => {
    let hashPW = bcrypt.hashSync(userPW, salt);
    //console.log('>>> check pw: ', hashPW);
    return hashPW;
}
const createNewUser = async (email, password, username) => {

    let hashPassword = hashUserPassword(password);
    try {
        await db.User.create({
            email: email,
            passwor: hashPassword,
            username: username
        })
    } catch (error) {
        console.log(error);
    }
}

const getUserList = async () => {
    //test relationships
    let newUser = await db.User.findOne({ // 1-1: Lấy User có id=1 và Group tương ứng
        where: {id: 1},
        attributes: ["id", "username", "email"],
        include: {model: db.Group, attributes: ["id", "name", "description"]},
        raw: true, // sequelize Obj => JS Obj
        nest: true, // Row liên kết ở tabke FK(User) -> PK(Group) => Object
    })
    //console.log(">>> check new user: ", newUser);

    let roles = await db.Role.findAll({// n-n: => Có 1 table Group_Role ở giữa
                                      // Tìm tất cả các Roles liên kết với Group có groupId = 1
                                      // => Tự động mapping
                                      // => Array với mỗi phần tử là object là:
                                        // row của role + group có id=1
        include: { model: db.Group, where: {id: 1}},
        raw: true,
        nest: true
    })

    //console.log(">>> check new roles: ", roles);

    let users = await db.User.findAll();
    return users;

}

const deleteUser = async (userId) => {
    await db.User.destroy({
        where: {id: userId}
    })
}
//update -> Chuyển hướng
const getUserById = async (userId) => {
    let user = await db.User.findOne({  // sequelize object <=> model => Nhiều thông tin hơn
        where: { id: userId } 
    });
    return user.get({plain: true});
}

//update -> Lấy data từ form
const updateUserInfor = async (userId,email,username) => {
    await db.User.update(
        { // UPDATE SET
            email: email,
            username: username
        },
        { // WHERE
            where: {
                id: userId,
            },
        },
    );
}

module.exports = {
    createNewUser,
    getUserList,
    deleteUser,
    getUserById,
    updateUserInfor, 

}
// // Lấy tất cả Group => Cần chuyển vô file API

// import db from "../models";

// const getGroups = async () => {
//     try {
//         let data = await db.Group.findAll({
//             order: [
//                 ['name', 'ASC'], // ORDER BY: column, DESC/ASC
//             ],
//         });
//         return {
//             EM: 'get group successfully!',
//             EC: 0,
//             DT: data
//         }
//     } catch (error) {
//         console.log(error);
//         return {
//             EM: 'something wrongs with service!',
//             EC: 1,
//             DT: []
//         }
//     }
// }
// module.exports = {
//     getGroups,

// }
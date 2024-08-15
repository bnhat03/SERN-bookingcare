// import db from "../models";

// const createNewRoles = async (roles) => { // Bulk => Thêm nhiểu record một lần
//     try {
//         let currentRoles = await db.Role.findAll({
//             // Array of objects in table roles
//             // Mỗi object có 2 phần tử: 
//             // url
//             // description
//             attributes: ['url', 'description'],
//             raw: true
//         })
//         let persists = roles.filter(({ url: url1 }) => {  // Mảng các object
//             // Google: How to get the difference between two arrays of objects in JavaScript
//             // Tìm URL có trong roles mà không có trong DB
//             // Kết quả là: Mảng các object
//             // Mỗi object có 2 phần tử: 
//             // url
//             // description
//             return !currentRoles.some(({ url: url2 }) => url1 === url2);
//         });
//         if (persists.length === 0) { // Toàn có trong DB
//             return {
//                 EM: 'Nothing to create ... ',
//                 EC: 0,
//                 DT: []
//             }

//         }
//         else {
//             await db.Role.bulkCreate(persists); // persists: Mảng các object
//             return {
//                 EM: `Create roles successfully: ${persists.length} roles... `,
//                 EC: 0,
//                 DT: []
//             }
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

// const getAllRoles = async () => {
//     try {
//         let data = await db.Role.findAll({
//             order: [
//                 ['id', 'DESC']
//             ],
//         })
//         return {
//             EM: 'Get all roles successfully!',
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
// const deleteRole = async (roleId) => {
//     try {
//         let role = await db.Role.findOne({
//             where: { id: roleId }
//         })
//         if (role) {
//             await role.destroy();
//             return {
//                 EM: 'Delete the role successfully!',
//                 EC: 0,
//                 DT: []
//             }
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

// const getRolesByGroup = async (groupId) => {
//     try {
//         if (!groupId) {
//             return {
//                 EM: 'Not found any roles!',
//                 EC: 0,
//                 DT: []
//             }
//         }
//         let roles = await db.Group.findOne({
//             // roles: Lấy 1 object Group có id trên, key dưới là 1 array gồm các phần tử object là Role => Lấy attribute như code
//             where: { id: groupId },
//             attributes: ['id', 'name', 'description'],
//             include: {
//                 model: db.Role,
//                 attributes: ['id', 'url', 'description'],
//                 through: { attributes: [] } // Ko lấy bảng mapping trung gian
//             }
//         })
//         return {
//             EM: 'Get roles by group successfully!',
//             EC: 0,
//             DT: roles
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

// const assignRolesToGroup = async (data) => {
//     try {
//         console.log(data);
//          = { groupId: 4, groupRoles: [{ groupId: 4, roleId: 1 }, { groupId: 4, roleId: 5 }, ...] }
//     // B1: Xóa hết các record role mà group có trong table group_role qua groupId
//     await db.Group_Role.destroy({
//         where: { groupId: +data.groupId }
//     })
//     // B2: Create Bulk vô table group_db qua mảng data.groupRoles => isAssigned=true
//     await db.Group_Role.bulkCreate(data.groupRoles);
//     return {
//         EM: 'Assign Role to Group successfully!',
//         EC: 0,
//         DT: []
//     }
// } catch (error) {
//     console.log(error);
//     return {
//         EM: 'something wrongs with service!',
//         EC: 1,
//         DT: []
//     }
// }
// }


// module.exports = {
//     createNewRoles,
//     getAllRoles,
//     deleteRole,
//     getRolesByGroup,
//     assignRolesToGroup,

// }
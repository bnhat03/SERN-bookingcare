
// import roleAPIService from '../service/roleAPIService'

// const readFunc = async (req, res) => {
//     try {
//         let data = await roleAPIService.getAllRoles();
//         return res.status(200).json({
//             EM: data.EM,
//             EC: data.EC,
//             DT: data.DT
//         })
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             EM: 'error from server',
//             EC: '-1',
//             DT: ''
//         })
//     }
// }


// const createFunc = async (req, res) => {
//     try {
//         let data = await roleAPIService.createNewRoles(req.body);
//         return res.status(200).json({
//             EM: data.EM,
//             EC: data.EC,
//             DT: data.DT
//         })
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             EM: 'error from server',
//             EC: '-1',
//             DT: ''
//         })
//     }
// }

// const updateFunc = async (req, res) => {
//     // try {
//     //     let data = await userAPIService.updateUser(req.body);
//     //     return res.status(200).json({
//     //         EM: data.EM, 
//     //         EC: data.EC, 
//     //         DT: data.DT 
//     //     })
//     // } catch (error) {
//     //     console.log(error);
//     //     return res.status(500).json({
//     //         EM: 'error from server', 
//     //         EC: '-1', 
//     //         DT: '' 
//     //     })
//     // }
// }
// const deleteFunc = async (req, res) => {
//     try {
//         let data = await roleAPIService.deleteRole(req.body.id);
//         return res.status(200).json({
//             EM: data.EM,
//             EC: data.EC,
//             DT: data.DT
//         })
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             EM: 'error from server',
//             EC: '-1',
//             DT: ''
//         })
//     }
// }

// // assign roles by group
// const getRolesByGroup = async (req, res) => {
//     try {
//         let groupId = req.params.groupId;
//         let data = await roleAPIService.getRolesByGroup(groupId);
//         return res.status(200).json({
//             EM: data.EM,
//             EC: data.EC,
//             DT: data.DT
//         })
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             EM: 'error from server',
//             EC: '-1',
//             DT: ''
//         })
//     }
// }

// const assignRolesToGroup = async (req, res) => {
//     try {
//         let data = await roleAPIService.assignRolesToGroup(req.body);
//         return res.status(200).json({
//             EM: data.EM,
//             EC: data.EC,
//             DT: data.DT
//         })
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             EM: 'error from server',
//             EC: '-1',
//             DT: ''
//         })
//     }
// }



// module.exports = {
//     readFunc,
//     createFunc,
//     updateFunc,
//     deleteFunc,
//     getRolesByGroup,
//     assignRolesToGroup,

// }
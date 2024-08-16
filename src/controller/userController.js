// API users
import userAPIService from '../service/userAPIService'


// const readFunc = async (req, res) => {
//     try {
//         if (req.query.page && req.query.limit) {
//             let { page, limit } = req.query;
//             // page: currentPage
//             // limit: items_each_page
//             let data = await userAPIService.getUserWithPagination(+page, +limit);
//             return res.status(200).json({
//                 EM: data.EM,
//                 EC: data.EC,
//                 DT: data.DT
//             })
//         }
//         else {
//             let data = await userAPIService.getAllUsers();
//             return res.status(200).json({
//                 EM: data.EM,
//                 EC: data.EC,
//                 DT: data.DT
//             })
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             EM: 'error from server',
//             EC: '-1',
//             DT: ''
//         })
//     }
// }
// // modal create user
const createFunc = async (req, res) => {
    try {
        // Chưa validate ??? => Trùng email, phone

        let data = await userAPIService.createNewUser(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}
// const updateFunc = async (req, res) => {
//     try {
//         let data = await userAPIService.updateUser(req.body);
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
// const deleteFunc = async (req, res) => {
//     try {
//         let data = await userAPIService.deleteUser(req.body.id);
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

// // Remove Session Storage
// const getUserAccount = async (req, res) => { // Sau khi đã login thành công (MW1), ko cần check quyền URL (MW2)
//     return res.status(200).json({
//         EM: "ok",
//         EC: 0,
//         DT: {
//             access_token: req.token,
//             groupWithRoles: req.user.groupWithRoles,
//             email: req.user.email,
//             username: req.user.username
//         }
//     })
// }


module.exports = {
    createFunc,
    // readFunc, 
    // updateFunc, 
    // deleteFunc, 
    // getUserAccount
}
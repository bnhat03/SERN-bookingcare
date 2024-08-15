// // Học CRUD Nodejs

// import user from "../models/user";
// import userService from "../service/userService"


// const handleHelloWorld = (req, res) => {
//     const name = "Bien Nhat";
//     return res.render("home.ejs", {name: name});
// }
// // Display list users
// const handleUserPage = async (req, res) => {
//     let userList = await userService.getUserList();
//     return res.render("user.ejs", {userList})
// }
// const handleCreateNewUser = async (req, res) => {
//     let {email, password, username} = req.body;
//     await userService.createNewUser(email,password,username);
//     return res.redirect("/user")
// }
// const handleDeleteUser = async (req, res) => {
//     await userService.deleteUser(req.params.id);
//     return res.redirect("/user")
// }

// // Update
// // Chuyển hướng sang trang khác
// const getUpdateUserPage = async (req, res) => {
//     let userObj = await userService.getUserById(req.params.id); // Array
//     // let userObj = {};
//     // if (user && user.length>0) {
//     //     userObj = user[0];
//     // }
//     //console.log(">>> check obj js: ", userObj);
//     return res.render("user-update.ejs", {userData: userObj});
// }
// // Lấy từ form update
// const handleUpdateUser = async (req, res) => {
//     let {userId, email, username} = req.body;
//     await userService.updateUserInfor(userId,email,username);
//     return res.redirect("/user")
// }


// module.exports = {
//     handleHelloWorld,
//     handleUserPage,
//     handleCreateNewUser,
//     handleDeleteUser,
//     getUpdateUserPage,
//     handleUpdateUser,

// }
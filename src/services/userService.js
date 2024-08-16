import axios from '../axios';

const handleLoginAPI = (userEmail, userPassword) => {
    return axios({ // return response: Object
        method: 'post',
        url: '/api/v1/login',
        data: {
            email: userEmail,
            password: userPassword
        }
    });
}
const getAllCodesService = (typeInput) => {
    return axios({ 
        method: 'get',
        url: `/api/v1/allcode?type=${typeInput}`
    });
}

export {
    handleLoginAPI,
    getAllCodesService,
}


// const registerNewUser = (email, phone, username, password) => {
//     return axios({ // return response: Object
//         method: 'post',
//         url: '/api/v1/register',
//         data: {
//             email, phone, username, password
//         }
//     });
// }
// const loginUser = (valueLogin, password) => {
//     return axios({ // return response: Object
//         method: 'post',
//         url: '/api/v1/login',
//         data: {
//             valueLogin, password
//         }
//     });
// }
// const fetchAllUser = (page, limit) => {
//     return axios({
//         method: 'get',
//         url: `/api/v1/user/read?page=${page}&limit=${limit}`,
//     });
// }

// const deleteUser = (user) => {
//     return axios({
//         method: 'delete',
//         url: '/api/v1/user/delete',
//         data: {
//             id: user.id
//         }
//     });
// }
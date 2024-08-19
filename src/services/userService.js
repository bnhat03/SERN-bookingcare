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
const createNewUserService = (dataUser) => {
    return axios({
        method: 'post',
        url: '/api/v1/user/create',
        data: {
            ...dataUser
        }
    });
}
const getAllUsers = () => {
    return axios({
        method: 'get',
        url: `/api/v1/user/read`
    });
}
const deleteUserService = (userId) => {
    return axios({
        method: 'delete',
        url: '/api/v1/user/delete',
        data: {
            id: userId
        }
    });
}
const updateUserService = (user) => {
    return axios({
        method: 'put',
        url: '/api/v1/user/update',
        data: {
            ...user
        }
    });
}

const getTopDoctorsHomeService = (limit) => {
    return axios({
        method: 'get',
        url: `/api/v1/doctor/top-doctor-home?limit=${limit}`
    });
}
const getAllDoctorsService = () => {
    return axios({
        method: 'get',
        url: `/api/v1/doctor/get-all-doctors`
    });
}
const saveDetailDoctorService = (dataMd) => {
    return axios({
        method: 'post',
        url: '/api/v1/doctor/save-infor-doctors',
        data: {
            ...dataMd
        }
    });
}
const getDetailInforDoctorService = (inputId) => { // id doctor
    return axios({
        method: 'get',
        url: `/api/v1/doctor/get-detail-doctor-by-id?id=${inputId}`
    });
}

export {
    handleLoginAPI,
    getAllCodesService,
    createNewUserService,
    getAllUsers,
    deleteUserService,
    updateUserService,
    getTopDoctorsHomeService,
    getAllDoctorsService,
    saveDetailDoctorService,
    getDetailInforDoctorService,

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
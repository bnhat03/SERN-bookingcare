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
const getAllPatientForDoctor = (data) => { // id doctor
    return axios({
        method: 'get',
        url: `/api/v1/doctor/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`
    });
}
// Schedule
const saveBulkScheduleDoctor = (dataSchedule) => { // id doctor
    return axios({
        method: 'post',
        url: '/api/v1/schedule/bulk-create-schedule',
        data: {
            ...dataSchedule
        }
    });
}
const getScheduleDoctorByDate = (doctorId, date) => {
    return axios({
        method: 'get',
        url: `/api/v1/schedule/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
    });
}
const getExtraInforDoctorById = (doctorId) => {
    return axios({
        method: 'get',
        url: `/api/v1/doctor/get-extra-infor-doctor-by-id?doctorId=${doctorId}`
    });
}
const getProfileDoctorById = (doctorId) => {
    return axios({
        method: 'get',
        url: `/api/v1/doctor/get-profile-doctor-by-id?doctorId=${doctorId}`
    });
}
const postPatientBookAppointment = (data) => {
    return axios({
        method: 'post',
        url: '/api/v1/patient/patient-book-appointment',
        data: {
            ...data
        }
    });
}

const postVerifyBookingAppointment = (data) => { // Nhấn link trong email
    return axios({
        method: 'post',
        url: '/api/v1/patient/verify-book-appointment',
        data: {
            ...data
        }
    });
}

// Specialty
const createNewSpecialty = (data) => {
    return axios({
        method: 'post',
        url: '/api/v1/specialty/create-new-specialty',
        data: {
            ...data
        }
    });
}
const getAllSpecialty = (obj) => {
    return axios({
        method: 'get',
        url: `/api/v1/specialty/get-specialty`
    });
}
const getAllDetailSpecialtyById = (obj) => {
    return axios({
        method: 'get',
        url: `/api/v1/specialty/get-detail-specialty-by-id?id=${obj.id}&location=${obj.location}`
    });
}

// Clinic
const createNewClinic = (data) => {
    return axios({
        method: 'post',
        url: '/api/v1/clinic/create-new-clinic',
        data: {
            ...data
        }
    });
}
const getAllClinic = (obj) => {
    return axios({
        method: 'get',
        url: `/api/v1/clinic/get-clinic`
    });
}
const getAllDetailClinicById = (obj) => {
    return axios({
        method: 'get',
        url: `/api/v1/clinic/get-detail-clinic-by-id?id=${obj.id}`
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
    saveBulkScheduleDoctor,
    getScheduleDoctorByDate,
    getExtraInforDoctorById,
    getProfileDoctorById,
    postPatientBookAppointment,
    postVerifyBookingAppointment,
    createNewSpecialty,
    getAllSpecialty,
    getAllDetailSpecialtyById,
    createNewClinic,
    getAllClinic,
    getAllDetailClinicById,
    getAllPatientForDoctor,
    
}


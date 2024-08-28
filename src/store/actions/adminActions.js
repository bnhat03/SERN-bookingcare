import actionTypes from './actionTypes';
import {
    getAllCodesService, createNewUserService, getAllUsers, deleteUserService, updateUserService,
    getTopDoctorsHomeService, getAllDoctorsService, saveDetailDoctorService,
    getAllSpecialty, getAllClinic
} from '../../services/userService';
import { toast } from 'react-toastify';
// GENDER
export const fetchGenderStart = () => { // call API
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START }); // isLoading
            let res = await getAllCodesService('GENDER');
            if (res && res.EC === 0) {
                dispatch(fetchGenderSuccess(res.DT));
            }
            else {
                dispatch(fetchGenderFailed());
            }
        } catch (error) {
            dispatch(fetchGenderFailed());
            console.log(error);
        }
    }
}
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

//POSITION
export const fetchPositionStart = () => { // call API
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodesService('POSITION');
            if (res && res.EC === 0) {
                dispatch(fetchPositionSuccess(res.DT));
            }
            else {
                dispatch(fetchPositionFailed());
            }
        } catch (error) {
            dispatch(fetchPositionFailed());
            console.log(error);
        }
    }
}
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

// ROLE
export const fetchRoleStart = () => { // call API
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodesService('ROLE');
            if (res && res.EC === 0) {
                dispatch(fetchRoleSuccess(res.DT));
            }
            else {
                dispatch(fetchRoleFailed());
            }
        } catch (error) {
            dispatch(fetchRoleFailed());
            console.log(error);
        }
    }
}
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

// user: create
export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            console.log(">>>check data", data);
            let res = await createNewUserService(data);
            if (res && res.EC === 0) {
                toast.success(res.EM);
                dispatch(saveUserSuccess());
                dispatch(fetchAllUsersStart());
            }
            else {
                dispatch(saveUserFailed());
            }
        } catch (error) {
            dispatch(saveUserFailed());
            console.log(error);
        }
    }
}
export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
})
export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

// fetch user
export const fetchAllUsersStart = () => { // call API
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers();
            if (res && res.EC === 0) {
                toast.success('Fetch all users success');
                dispatch(fetchAllUsersSuccess(res.DT.reverse()));
            }
            else {
                toast.error('Fetch all users error!');
                dispatch(fetchAllUsersFailed());
            }
        } catch (error) {
            toast.error('Fetch all users error!');
            dispatch(fetchAllUsersFailed());
            console.log(error);
        }
    }
}
export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})
export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED
})

// user: delete
export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.EC === 0) {
                toast.success(res.EM);
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart());
            }
            else {
                toast.error(res.EM);
                dispatch(deleteUserFailed());
            }
        } catch (error) {
            dispatch(deleteUserFailed());
            console.log(error);
        }
    }
}
export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})
export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})


// update
export const updateAUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await updateUserService(data);
            if (res && res.EC === 0) {
                toast.success(res.EM);
                dispatch(updateUserSuccess());
                dispatch(fetchAllUsersStart());
            }
            else {
                toast.error(res.EM);
                dispatch(updateUserFailed());
            }
        } catch (error) {
            dispatch(updateUserFailed());
            console.log(error);
        }
    }
}
export const updateUserSuccess = () => ({
    type: actionTypes.UPDATE_USER_SUCCESS,
})
export const updateUserFailed = () => ({
    type: actionTypes.UPDATE_USER_FAILED
})

// Doctor
export const fetchTopDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorsHomeService('7');
            if (res && res.EC === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctors: res.DT
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILED
                })
            }
        } catch (error) {
            console.log(error);
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAILED
            })
        }
    }
}

export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctorsService();
            if (res && res.EC === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataDoctors: res.DT
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILED
                })
            }
        } catch (error) {
            console.log(error);
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILED
            })
        }
    }
}
// Save infor Markdown
export const saveDetailDoctor = (dataMd) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorService(dataMd);
            if (res && res.EC === 0) {
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                })
                toast.success(res.EM);
            }
            else {
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED
                })
            }
        } catch (error) {
            console.log(error);
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED
            })
        }
    }
}

// Schedule doctor
export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodesService("TIME");
            if (res && res.EC === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTimes: res.DT
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
                })
            }
        } catch (error) {
            console.log(error);
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
            })
        }
    }
}

// 3 trong 1 => Price + Payment + Province
export const getRequiredDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START,
            })

            let resPrice = await getAllCodesService("PRICE");
            let resPayment = await getAllCodesService("PAYMENT");
            let resProvince = await getAllCodesService("PROVINCE");

            let resSpecialty = await getAllSpecialty();
            let resClinic = await getAllClinic();

            if (resPrice && resPrice.EC === 0
                && resPayment && resPayment.EC === 0
                && resProvince && resProvince.EC === 0
                && resSpecialty && resSpecialty.EC === 0
                && resClinic && resClinic.EC === 0
            ) {
                let data = {
                    resPrice: resPrice.DT,
                    resPayment: resPayment.DT,
                    resProvince: resProvince.DT,
                    resSpecialty: resSpecialty.DT,
                    resClinic: resClinic.DT
                }
                dispatch(fetchRequiredDoctorInforSuccess(data));
            }
            else {
                dispatch(fetchRequiredDoctorInforFailed());
            }
        } catch (error) {
            console.log(error);
            dispatch(fetchRequiredDoctorInforFailed())
        }
    }
}
export const fetchRequiredDoctorInforSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: allRequiredData
})
export const fetchRequiredDoctorInforFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED
})

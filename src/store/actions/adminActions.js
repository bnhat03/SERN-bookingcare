import actionTypes from './actionTypes';
import { getAllCodesService } from '../../services/userService';

// GENDER
export const fetchGenderStart = () => { // call API
    return async (dispatch, getState) => {
        try {
            dispatch({type: actionTypes.FETCH_GENDER_START}); // isLoading
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
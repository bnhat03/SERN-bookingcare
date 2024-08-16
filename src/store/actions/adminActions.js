import actionTypes from './actionTypes';
import { getAllCodesService } from '../../services/userService';

// GENDER
export const fetchGenderStart = () => { // call API
    return async (dispatch, getState) => {
        try {
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

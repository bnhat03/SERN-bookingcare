import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    isLoadingGender: false, // Chỉ làm loading GENDER thôi
    roles: [],
    positions: [],
    users: [],
    topDoctors: [],
    allDoctors: [],
    allScheduleTime: [], // TIME trong AllCode
    // Price + Payment + Province
    allRequiredDoctorInfor: [],

}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        //GENDER
        case actionTypes.FETCH_GENDER_START:
            state.isLoadingGender = true;
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.isLoadingGender = false;
            state.genders = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_FAILED:
            state.isLoadingGender = false;
            state.genders = [];
            return {
                ...state,
            }
        //POSITION
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_FAILED:
            state.positions = [];
            return {
                ...state,
            }
        //ROLE
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = [];
            return {
                ...state,
            }
        //user: create
        case actionTypes.CREATE_USER_SUCCESS:
            return {
                ...state,
            }
        case actionTypes.CREATE_USER_FAILED:
            return {
                ...state,
            }
        //user: fetch all users
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.users
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USERS_FAILED:
            state.users = [];
            return {
                ...state,
            }
        //user: delete
        case actionTypes.DELETE_USER_SUCCESS:
            return {
                ...state,
            }
        case actionTypes.DELETE_USER_FAILED:
            return {
                ...state,
            }
        //user: update
        case actionTypes.UPDATE_USER_SUCCESS:
            return {
                ...state,
            }
        case actionTypes.UPDATE_USER_FAILED:
            return {
                ...state,
            }
        // Outstanding Doctor
        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            state.topDoctors = action.dataDoctors;
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTORS_FAILED:
            state.topDoctors = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            state.allDoctors = action.dataDoctors
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTORS_FAILED:
            state.allDoctors = [];
            return {
                ...state,
            }
        // TIME in AllCode
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
            state.allScheduleTime = action.dataTimes
            return {
                ...state,
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
            state.allScheduleTime = [];
            return {
                ...state,
            }
        // Price + Payment + Province
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START: // Chưa làm chi cả luôn
            return {
                ...state,
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
            state.allRequiredDoctorInfor = action.data;
            // console.log(">>> check action.data" , action.data);
            return {
                ...state,
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED:
            state.allRequiredDoctorInfor = [];
            return {
                ...state,
            }
        default:
            return state;
        //Note cuối:
        // 1. Có isLoading thì các CASE trên mới bổ ích (Thay đổi state)
        // Ví dụ GENDER có isLOADING => Phát huy hết khả năng của các CASE này
        // 2. FETCH data (READ) => Thay đổi state Redux => FETCH sau mỗi lần CREATE, DELETE, UPDATE
        // 3. DETELE, UPDATE, CREATE => Không thay đổi state Redux => Có thể ko cần viết CASE trong Reducer ni
    }
}

export default adminReducer;
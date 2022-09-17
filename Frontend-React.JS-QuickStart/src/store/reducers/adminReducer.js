import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGener: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctors: [],
    doctors: [],
    hours: [],
    allRequiredDoctorInfor: {}

}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            return {
                ...state,
                isLoadingGener: true
            }
        case actionTypes.FETCH_GENDER_SUCCESS:

            return {
                ...state,
                genders: action.data,
                isLoadingGener: false


            }
        case actionTypes.FETCH_GENDER_FAILED:

            return {
                ...state,
                isLoadingGener: false
            }
        case actionTypes.FETCH_POSITION_SUCCESS:

            return {
                ...state,
                positions: action.data,


            }
        case actionTypes.FETCH_POSITION_FAILED:

            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_SUCCESS:

            return {
                ...state,
                roles: action.data,


            }
        case actionTypes.FETCH_ROLE_FAILED:
            return {
                ...state,
            }

        case actionTypes.SAVE_USER_SUCCESS:

            return {
                ...state,



            }
        case actionTypes.SAVE_USER_FAILED:
            return {
                ...state,
            }

        case actionTypes.GET_ALL_USER_SUCCESS:

            return {
                ...state,
                users: action.users
            }
        case actionTypes.GET_ALL_USER_FAILED:
            return {
                ...state,
                users: []
            }

        case actionTypes.DELETE_USER_SUCCESS:

            return {
                ...state,
            }
        case actionTypes.DELETE_USER_FAILED:
            return {
                ...state,
            }

        case actionTypes.EDIT_USER_SUCCESS:

            return {
                ...state,
            }
        case actionTypes.EDIT_USER_FAILED:
            return {
                ...state,
            }

        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:

            return {
                ...state,
                topDoctors: action.dataDoctors

            }
        case actionTypes.FETCH_TOP_DOCTOR_FAILED:
            return {
                ...state,
                topDoctors: []
            }


        case actionTypes.FETCH_DOCTOR_SUCCESS:

            return {
                ...state,
                doctors: action.data

            }
        case actionTypes.FETCH_DOCTOR_FAILED:
            return {
                ...state,
                doctors: []
            }
        case actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS:

            return {
                ...state,

            }
        case actionTypes.SAVE_DETAIL_DOCTOR_FAILED:
            return {
                ...state,

            }
        case actionTypes.FETCH_ALLCODE_HOURS_SUCCESS:

            return {
                ...state,
                hours: action.data

            }
        case actionTypes.FETCH_ALLCODE_HOURS_FAILED:
            return {
                ...state,

            }
        case actionTypes.GET_REQUIRED_DOCTOR_INFOR_SUCCESS:
            return {
                ...state,
                allRequiredDoctorInfor: action.data

            }
        case actionTypes.GET_REQUIRED_DOCTOR_INFOR_FAILED:
            return {
                ...state,

            }

        default:
            return state;
    }
}

export default adminReducer;
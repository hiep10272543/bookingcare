import actionTypes from './actionTypes';
import {
    getAllCode, CreateUser, getAllUsers, DeleteUser, UpdateUserData, getTopDoctorHome, getAllDoctor,
    saveDetailDoctor, getAllSpecialty, getAllClinic
} from "../../services"
import { toast } from 'react-toastify';


// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {


        try {

            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCode('gender')
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.message))
            }
            else {
                dispatch(fetchGenderFailed())

            }
        }
        catch (err) {
            console.log(err)
            dispatch(fetchGenderFailed())
        }

    }


}

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {


        try {
            let res = await getAllCode('position')
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.message))
            }
            else {
                dispatch(fetchPositionFailed())

            }
        }
        catch (err) {
            console.log(err)
            dispatch(fetchPositionFailed())
        }

    }


}
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {


        try {

            dispatch({
                type: actionTypes.FETCH_ROLE_START
            })
            let res = await getAllCode('role')
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.message))
            }
            else {
                dispatch(fetchRoleFailed())

            }
        }
        catch (err) {
            console.log(err)
            dispatch(fetchRoleFailed())
        }

    }


}

export const fetchGenderSuccess = (data) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: data

})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})


export const fetchPositionSuccess = (data) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: data

})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})


export const fetchRoleSuccess = (data) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: data

})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})



export const saveUserStart = (data) => {
    return async (dispatch, getState) => {


        try {
            let res = await CreateUser(data)
            if (res && res.errCode === 0) {

                toast.success('Create User success')
                dispatch(saveUserSuccess())
                dispatch(getAllUserStart())
            }
            else {
                dispatch(saveUserFailed())
                if (res && res.errCode === 1 || res && res.errCode === 3) {
                    toast.error(`${res.message}`)

                }
            }
        }
        catch (err) {
            console.log(err)
            dispatch(saveUserFailed())
        }

    }


}

export const saveUserSuccess = (data) => ({
    type: actionTypes.SAVE_USER_SUCCESS,

})

export const saveUserFailed = () => ({
    type: actionTypes.SAVE_USER_FAILED
})


export const getAllUserStart = () => {
    return async (dispatch, getState) => {


        try {

            let res = await getAllUsers('all')

            if (res && res.errCode === 0) {
                dispatch(getAllUserSuccess(res.user.reverse()))
            }
            else {
                dispatch(getAllUserFailed())

            }
        }
        catch (err) {
            console.log(err)
            dispatch(getAllUserFailed())
        }

    }


}


export const getAllUserSuccess = (data) => ({
    type: actionTypes.GET_ALL_USER_SUCCESS,
    users: data

})

export const getAllUserFailed = () => ({
    type: actionTypes.GET_ALL_USER_FAILED,
})

export const deleteUserStart = (id) => {
    return async (dispatch, getState) => {


        try {

            let res = await DeleteUser(id)
            if (res && res.errCode === 0) {
                toast.success('Delete User success')
                dispatch(deleteUserSuccess())
                dispatch(getAllUserStart())

            }
            else {
                dispatch(deleteUserFailed())
            }
        }
        catch (err) {
            dispatch(deleteUserFailed())
        }

    }


}


export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,


})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED,
})



export const editUserStart = (data) => {
    return async (dispatch, getState) => {


        try {

            let res = await UpdateUserData(data)
            if (res && res.errCode === 0) {
                toast.success('Edit User success')
                dispatch(editUserSuccess())
                dispatch(getAllUserStart())

            }
            else {
                dispatch(editUserFailed())
            }
        }
        catch (err) {
            dispatch(editUserFailed())
        }

    }


}


export const editUserSuccess = (data) => ({
    type: actionTypes.EDIT_USER_SUCCESS,

})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED,
})


export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {


        try {
            let res = await getTopDoctorHome(5)
            if (res && res.errCode === 0) {
                dispatch(fetchTopDoctorSuccess(res.data))
            }
            else {
                dispatch(
                    fetchTopDoctorFailed()

                )
            }



        }
        catch (err) {
            dispatch(
                fetchTopDoctorFailed()

            )
        }

    }
}

export const fetchTopDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
    dataDoctors: data

})

export const fetchTopDoctorFailed = () => ({
    type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
})

export const fetchDoctorStart = () => {
    return async (dispatch, getState) => {


        try {
            let res = await getAllDoctor()


            if (res && res.errCode === 0) {
                dispatch(fetchDoctorSuccess(res.data))
            }
            else {
                dispatch(
                    fetchDoctorFailed()

                )
            }



        }
        catch (err) {
            dispatch(
                fetchDoctorFailed()

            )
        }

    }

}


export const fetchDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_DOCTOR_SUCCESS,
    data: data

})

export const fetchDoctorFailed = () => ({
    type: actionTypes.FETCH_DOCTOR_FAILED,
})


export const saveDetailDoctorStart = (data) => {
    return async (dispatch, getState) => {


        try {
            let res = await saveDetailDoctor(data)

            if (res && res.errCode === 0) {
                toast.success('Save infor detail Doctor success')

                dispatch(saveDetailDoctorSuccess(res.data))
            }
            else {
                toast.error('Save infor detail Doctor error')
                dispatch(

                    saveDetailDoctorFailed()

                )
            }



        }
        catch (err) {
            toast.error('Save infor detail Doctor error')
            dispatch(

                saveDetailDoctorFailed()

            )
        }

    }

}

export const saveDetailDoctorSuccess = () => ({
    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,


})

export const saveDetailDoctorFailed = () => ({
    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
})

export const fetchAllcodeHoursStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCode('TIME')
            if (res && res.errCode === 0) {
                dispatch(fetchAllcodeHoursSuccess(res.message))
            }
            else {
                dispatch(
                    fetchAllcodeHoursFailed()
                )
            }



        }
        catch (err) {
            toast.error('Save infor detail Doctor error')
            dispatch(

                fetchAllcodeHoursFailed()

            )
        }

    }

}

export const fetchAllcodeHoursSuccess = (data) => ({
    type: actionTypes.FETCH_ALLCODE_HOURS_SUCCESS,
    data: data

})

export const fetchAllcodeHoursFailed = () => ({
    type: actionTypes.FETCH_ALLCODE_HOURS_FAILED,
})



export const getRequiredDoctorInfo = () => {
    return async (dispatch, getState) => {
        try {
            let resPrice = await getAllCode('price')
            let resPayment = await getAllCode('payment')
            let resProvince = await getAllCode('PROVINCE')
            let resSpecialty = await getAllSpecialty()
            let resClinic = await getAllClinic()
            // getAllClinic




            if (resPrice && resPrice.errCode === 0
                && resPayment && resPayment.errCode === 0
                && resProvince && resProvince.errCode === 0
                && resSpecialty && resSpecialty.errCode === 0
                && resClinic && resClinic.errCode === 0
            ) {

                // let data = 

                dispatch(getRequiredDoctorInfoSuccess({
                    resPrice: resPrice.message,
                    resPayment: resPayment.message,
                    resProvince: resProvince.message,
                    resSpecialty: resSpecialty.data,
                    resClinic: resClinic.data
                }))
            }
            else {
                dispatch(
                    getRequiredDoctorInfoFailed()
                )
            }



        }
        catch (err) {
            dispatch(
                getRequiredDoctorInfoFailed()

            )
        }

    }

}


export const getRequiredDoctorInfoSuccess = (data) => ({
    type: actionTypes.GET_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: data

})

export const getRequiredDoctorInfoFailed = () => ({
    type: actionTypes.GET_REQUIRED_DOCTOR_INFOR_SUCCESS,
})
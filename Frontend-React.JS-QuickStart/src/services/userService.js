import axios from "../axios"

export const handleLogin = (email, password) => {

    return axios.post('/api/login', { email, password })

}

export const getAllUsers = (inputID) => {
    return axios.get(`/api/get-all-user?id=${inputID}`)

}

export const CreateUser = (data) => {
    return axios.post('/api/create-new-user', data)

}

export const DeleteUser = (userID) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userID
        }
    })

}
export const UpdateUserData = (data) => {
    return axios.put('/api/edit-user', data)
}

export const getAllCode = (data) => {
    return axios.get(`/api/allcode?type=${data}`)
}

export const getTopDoctorHome = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

export const getAllDoctor = () => {
    return axios.get(`/api/get-all-doctor`)
}


export const saveDetailDoctor = (data) => {
    return axios.post(`/api/save-info-doctors`, data)


}


export const getDetailDoctor = (id) => {
    return axios.get(`/api/get-detail-doctor?id=${+id}`)


}



export const saveBulkScheduleDocotr = (data) => {
    return axios.post('/api/bulk-create-schedule', data)


}


export const getScheduleDoctorById = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)


}

export const getExtraInforDoctorById = (doctorId) => {
    return axios.get(`/api/get-extra-info-dotor-by-id?id=${doctorId}`)
}

export const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-dotor-by-id?id=${doctorId}`)
}


export const postPatientAppointment = (data) => {
    return axios.post(`/api/patient-book-appointment`, data)
}


export const verifyPatientAppointment = (data) => {
    return axios.post(`/api/verify-book-appointment`, data)
}


export const createSpecialty = (data) => {
    return axios.post(`/api/create-new-specialty`, data)
}


export const getAllSpecialty = () => {
    return axios.get(`/api/get-all-specialty`)


}


export const getDetailSpecialtyById = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`)
}


export const createClinic = (data) => {
    return axios.post(`/api/create-new-clinic`, data)
}

export const getAllClinic = () => {
    return axios.get(`/api/get-clinic`)
}

export const getDetailClinicById = (data) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`)
}


export const getAllPatientForDoctor = (data) => {

    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${+data.doctorId}&date=${data.date}`)
}


export const PostSendRemedy = (data) => {

    return axios.post(`/api/send-remedy`, data)
}

export const DeleteSpecialtyById = (id) => {
    return axios.delete('/api/delete-specialty-by-id', {
        data: {
            id: id
        }
    })

}

export const editSpecialty = (data) => {
    return axios.put('/api/edit-specialty', data)
}


export const DeleteClinicById = (id) => {
    return axios.delete('/api/delete-clinic-by-id', {
        data: {
            id: id
        }
    })

}

export const editClinic = (data) => {
    return axios.put('/api/edit-clinic', data)
}


// 
// 
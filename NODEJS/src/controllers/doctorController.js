import {
    getTopDoctorHome, getAllDoctors, saveInforDoctor, getDetailDoctor, bulkCreateSchedule,
    GetScheduleDoctorByDate, GetExtraInfoDotorById, GetProfileDotorById, getListPatientForDoctor
} from "../services/doctorService"

let handleGetTopDoctor = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) {
        limit = 5
    }

    try {
        let response = await getTopDoctorHome(+limit)
        res.status(200).json(response)

    }
    catch (err) {
        console.error(err)
        return res.status(200).json({
            errCode: -1,
            message: "Erro from server"
        })
    }

}

let handleGetAllDoctor = async (req, res) => {
    try {
        let doctors = await getAllDoctors()
        res.status(200).json({
            errCode: 0,
            data: doctors
        })
    }
    catch (err) {
        res.status(200).json({
            errCode: -1,
            message: 'err sever'
        })
    }
}

let handlePostInforDoctor = async (req, res) => {
    try {

        let response = await saveInforDoctor(req.body)
        return res.status(200).json(response)

    }
    catch (err) {
        res.status(200).json({
            errCode: -1,
            message: 'err sever'
        })
    }
}


let getDetailDoctorById = async (req, res) => {
    try {

        if (!req.query.id) { return }
        let info = await getDetailDoctor(req.query.id)
        return res.status(200).json(info)

    }
    catch (err) {
        res.status(200).json({
            errCode: -1,
            errMessage: ' error sever'
        })
    }
}


let handleBulkCreateSchedule = async (req, res) => {
    try {

        let response = await bulkCreateSchedule(req.body)
        return res.status(200).json(response)

    }
    catch (err) {
        res.status(200).json({
            errCode: -1,
            errMessage: ' error sever'
        })
    }
}

let handleGetScheduleDoctorByDate = async (req, res) => {
    try {

        let response = await GetScheduleDoctorByDate(req.query.doctorId, req.query.date);
        return res.status(200).json(response)

    }
    catch (err) {
        res.status(200).json({
            errCode: -1,
            errMessage: ' error sever'
        })
    }
}


let handleGetExtraInfoDotorById = async (req, res) => {
    try {

        let response = await GetExtraInfoDotorById(req.query.id);
        return res.status(200).json(response)

    }
    catch (err) {
        res.status(200).json({
            errCode: -1,
            errMessage: ' error sever'
        })
    }
}


let handleGetProfileDotorById = async (req, res) => {
    try {

        let response = await GetProfileDotorById(req.query.id);
        return res.status(200).json(response)

    }
    catch (err) {
        res.status(200).json({
            errCode: -1,
            errMessage: ' error sever'
        })
    }
}

let handleGetListPatientForDoctor = async (req, res) => {
    try {

        let response = await getListPatientForDoctor(req.query.doctorId, req.query.date);
        return res.status(200).json(response)

    }
    catch (err) {
        res.status(200).json({
            errCode: -1,
            errMessage: ' error sever'
        })
    }
}

module.exports = {
    handleGetTopDoctor,
    handleGetAllDoctor,
    handlePostInforDoctor,
    getDetailDoctorById,
    handleBulkCreateSchedule,
    handleGetScheduleDoctorByDate,
    handleGetExtraInfoDotorById,
    handleGetProfileDotorById,
    handleGetListPatientForDoctor



}

import {
    createNewClinic, getAllClinic,
    getDetailClinicById, DeleteClinicById,
    EditClinic
} from "../services/clinicService"







let handleCreateNewClinic = async (req, res) => {
    try {
        let data = await createNewClinic(req.body)

        res.status(200).json(data)
    }
    catch (err) {
        res.status(200).json({
            errorCode: -1,
            message: "error from server"
        })
    }
}


let handleGetAllClinic = async (req, res) => {
    try {
        let data = await getAllClinic()

        res.status(200).json(data)
    }
    catch (err) {
        res.status(200).json({
            errorCode: -1,
            message: "error from server"
        })
    }
}

let handleGetDetailClinicById = async (req, res) => {
    try {
        let data = await getDetailClinicById(req.query.id)

        res.status(200).json(data)
    }
    catch (err) {
        res.status(200).json({
            errorCode: -1,
            message: "error from server"
        })
    }
}

let handleDeleteClinicById = async (req, res) => {
    try {
        let data = await DeleteClinicById(req.body.id)

        res.status(200).json(data)
    }
    catch (err) {
        res.status(200).json({
            errorCode: -1,
            message: "error from server"
        })
    }
}

let handleEditClinic = async (req, res) => {
    try {
        let data = await EditClinic(req.body)

        res.status(200).json(data)
    }
    catch (err) {
        res.status(200).json({
            errorCode: -1,
            message: "error from server"
        })
    }
}


module.exports = {

    handleCreateNewClinic,
    handleGetAllClinic,
    handleGetDetailClinicById,
    handleDeleteClinicById,
    handleEditClinic


}
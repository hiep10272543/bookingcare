
import { CreateNewSpecialty, getAllSpecialty, getDetailSpecialtyById, DeleteSpecialtyById, EditSpecialty } from "../services/specialtyService"







let handleCreateNewSpecialty = async (req, res) => {
    try {
        let data = await CreateNewSpecialty(req.body)

        res.status(200).json(data)
    }
    catch (err) {
        res.status(200).json({
            errorCode: -1,
            message: "error from server"
        })
    }
}


let handleGetAllSpecialty = async (req, res) => {
    try {
        let data = await getAllSpecialty()

        res.status(200).json(data)
    }
    catch (err) {
        res.status(200).json({
            errorCode: -1,
            message: "error from server"
        })
    }
}

let handleGetDetailSpecialtyById = async (req, res) => {
    try {
        let data = await getDetailSpecialtyById(req.query.id, req.query.location)

        res.status(200).json(data)
    }
    catch (err) {
        res.status(200).json({
            errorCode: -1,
            message: "error from server"
        })
    }
}

let handleDeleteSpecialtyById = async (req, res) => {
    try {
        let data = await DeleteSpecialtyById(req.body.id)

        res.status(200).json(data)
    }
    catch (err) {
        res.status(200).json({
            errorCode: -1,
            message: "error from server"
        })
    }
}

let handleEditSpecialty = async (req, res) => {
    try {
        let data = await EditSpecialty(req.body)

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

    handleCreateNewSpecialty,
    handleGetAllSpecialty,
    handleGetDetailSpecialtyById,
    handleDeleteSpecialtyById,
    handleEditSpecialty



}
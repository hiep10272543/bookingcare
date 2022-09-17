
import { handleUserLogin, getAllUser, createNewUser, deleteUser, updateUserData, getAllCode, getAllDoctors } from '../services/userervice'

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: "missing input parameter"
        })
    }
    let userData = await handleUserLogin(email, password)

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        userData: userData.user || {}

    })
}

let handleGetAllUser = async (req, res) => {
    let id = req.query.id
    let user = await getAllUser(id)

    return res.status(200).json({
        errCode: 0,
        errMessage: 'oke',
        user: user
    })


}

let handleCreateNewUser = async (req, res) => {
    let message = await createNewUser(req.body)
    console.log(message)
    res.status(200).json(message)


}

let handleEditUser = async (req, res) => {
    let data = req.body
    let message = await updateUserData(data)
    return res.status(200).json(message)
}

let handleDeleteUser = async (req, res) => {
    let id = req.body.id
    if (!id) {
        return res.status(500).json({
            errCode: 1,
            message: "missing id"
        })
    }
    else {
        let message = await deleteUser(id)
        res.status(200).json(message)

    }
}


let handleGetAllCode = async (req, res) => {

    try {
        let typeInput = req.query.type
        let data = await getAllCode(typeInput)
        res.status(200).json(data)

    }
    catch (err) {
        res.status(200).json({
            errCode: -1,
            message: 'err sever'
        })
    }




}




module.exports = {
    handleLogin,
    handleGetAllUser,
    handleCreateNewUser,
    handleDeleteUser,
    handleEditUser,
    handleGetAllCode,




}





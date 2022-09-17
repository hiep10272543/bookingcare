
import {postBookAppointment, verifyBookAppointment, sendRemedy} from "../services/paitentService"
 





let handlePostBookAppointment = async (req, res) => {
    try {

        let response = await postBookAppointment(req.body);
        return res.status(200).json(response)

    }
    catch (err) {
        res.status(200).json({
            errCode: -1,
            errMessage: ' error sever'
        })
    }
}


let handleVerifyBookAppointment = async (req, res) => {
    try {

        let response = await verifyBookAppointment(req.body);
        return res.status(200).json(response)

    }
    catch (err) {
        res.status(200).json({
            errCode: -1,
            errMessage: ' error sever'
        })
    }
}


let handleSendRemedy = async (req, res) => {
    try {

        let response = await sendRemedy(req.body);
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

    handlePostBookAppointment,
    handleVerifyBookAppointment,
    handleSendRemedy



}
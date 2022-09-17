import db from '../models/index'
require('dotenv').config();
import { sendSimpleEmail, sendAttachment } from "./emailService"
import { v4 as uuidv4 } from 'uuid';

import _ from 'lodash'



let buildUrlEmail = (doctorId, token) => {
    let result = ''
    result = `${process.env.URL_REACT}/verify-booking/${token}&${doctorId}`
    return result
}

let postBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {



            if (!data.email || !data.doctorId || !data.date
                || !data.timeType || !data.fullName || !data.selectedGender || !data.address) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter"
                })
            } else {

                let token = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
                await sendSimpleEmail({
                    reciverEmail: data.email,
                    patientName: data.fullName,
                    time: data.timeString,
                    doctorName: data.doctorName,
                    redirectLink: buildUrlEmail(data.doctorId, token),
                    language: data.language
                })


                let [user, created] = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 'R3',
                        gender: data.selectedGender,
                        address: data.address,
                        firstName: data.fullName,
                        phonenumber: data.phoneNumber,
                    }
                });


                if (user) {

                    await db.Booking.findOrCreate({
                        where: {
                            patientId: user.id, statusId: 'S1',
                            date: data.date, timeType: data.timeType
                        },
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user.id,
                            date: data.date,
                            timeType: data.timeType,
                            token: token

                        }
                    })

                }

                resolve({
                    errCode: 0,
                    errMessage: 'Save success'

                })


            }
        }
        catch (err) {
            reject(err)
        }
    })
}

let verifyBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.token || !data.doctorId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            }
            else {
                let appointment = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        token: data.token,
                        statusId: 'S1'
                    },
                    raw: false
                })
                if (appointment) {
                    appointment.statusId = "S2"
                    await appointment.save()
                    resolve({
                        errCode: 0,
                        errMessage: 'update done'
                    })
                }
                else {
                    resolve({
                        errCode: 1,
                        errMessage: 'update error'
                    })
                }


            }

        }
        catch (err) {
            reject(err)
        }
    })
}


let sendRemedy = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.patientId || !data.timeType) {
                resolve({
                    errCode: 1,
                    message: 'Missing required parameter'
                })
            }
            else {
                let appointment = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        patientId: data.patientId,
                        timeType: data.timeType,
                        statusId: 'S2'

                    },
                    raw: false
                })
                if (appointment) {
                    appointment.statusId = 'S3'
                    await appointment.save()
                }
                resolve({
                    errCode: 0,
                    message: 'Done'
                })



                await sendAttachment(data)


            }

        }
        catch (err) {
            reject(err)
        }
    })
}


module.exports = {

    postBookAppointment,
    verifyBookAppointment,
    sendRemedy


}
import db from '../models/index'
require('dotenv').config();

import _ from 'lodash'

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE




let getTopDoctorHome = (limit) => {

    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findAll({
                limit: limit,
                attributes: { exclude: ['password'] },
                order: [['createdAt', 'DESC'],],
                where: { roleId: 'R2' },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },

                ],
                raw: true,
                nest: true
            })
            resolve({
                errCode: 0,
                data: user

            })

        }

        catch (err) {
            reject(err)
        }
    })
}




let getAllDoctors = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                where: { roleId: 'R2' },
                attributes: { exclude: ['password'] },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    {
                        model: db.Doctor_infor,
                        include: [
                            { model: db.Specialty, as: 'specialtyTypeData', attributes: ['name', 'id'] },
                            { model: db.Clinic, as: 'clinicTypeData', attributes: ['name', 'id'] },
                        ],
                    },

                ],
                raw: true,
                nest: true

            })
            resolve(doctors)
        }
        catch (err) {
            reject(err)
        }
    })
}

let checkRequiredFields = (inputData) => {
    let arr = [
        "id",
        "contentHTML",
        "contentMarkdown",
        "action",
        "selectedPrice",
        "selectedPayment",
        "selectedProvinces",
        "clinicId",
        "note",
        "specialtyId"
    ];
    let isValid = true;
    let element = ''
    for (let i = 0; i < arr.length; i++) {
        if (!inputData[arr[i]]) {
            isValid = false;
            element = arr[i];
            break;
        }
    }
    return {
        isValid,
        element
    }

}


let saveInforDoctor = (data) => {
    return new Promise(async (resolve, reject) => {




        try {

            let checkObject = checkRequiredFields(data)

            if (!checkObject.isValid) {
                resolve({
                    errCode: 1,
                    errMessage: `missing parameter: ${checkObject.element}`
                })
            }
            else {

                if (data.action === "CREATE") {
                    await db.Markdown.create({
                        contentHTML: data.contentHTML,
                        contentMarkdown: data.contentMarkdown,
                        description: data.description,
                        doctorId: data.id,
                    })
                }
                if (data.action === "EDIT") {
                    let user = await db.Markdown.findOne({
                        where: { doctorId: data.id }, raw: false

                    })
                    if (user) {

                        user.contentHTML = data.contentHTML,
                            user.contentMarkdown = data.contentMarkdown,
                            user.description = data.description,
                            user.doctorId = data.id


                        await user.save();

                    }
                }
                console.log(data.id)
                let infor = await db.Doctor_infor.findOne({
                    where: {
                        doctorId: data.id
                    },
                    raw: false,

                })
                console.log(infor)

                // !data.selectedPrice
                // || !data.selectedPayment || !data.selectedProvinces
                // || !data.nameClinic || !data.addressClinic || !data.note)

                if (infor) {
                    infor.doctorId = data.id
                    infor.priceId = data.selectedPrice
                    infor.provinceId = data.selectedProvinces
                    infor.paymentId = data.selectedPayment
                    infor.addressClinic = data.addressClinic
                    infor.nameClinic = data.nameClinic
                    infor.note = data.note
                    infor.specialtyId = data.specialtyId
                    infor.clinicId = data.clinicId
                    infor.count = 0
                    await infor.save();

                }
                if (!infor) {
                    infor = await db.Doctor_infor.create({
                        doctorId: data.id,
                        priceId: data.selectedPrice,
                        provinceId: data.selectedProvinces,
                        paymentId: data.selectedPayment,
                        specialtyId: data.specialtyId,
                        addressClinic: data.addressClinic,
                        nameClinic: data.nameClinic,
                        clinicId: data.clinicId,
                        note: data.note,
                        count: 0

                    })
                }



            }

            resolve({
                errCode: 0,
                message: 'update done'
            });
        }
        catch (err) {
            console.log(err)
            reject(err)
        }

    })
}


let getDetailDoctor = (inputID) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputID) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            }
            else {
                let data = await db.User.findOne({
                    where: { id: inputID },
                    attributes: { exclude: ['password'] },
                    include: [
                        {
                            model: db.Markdown,
                            attributes: ['description', 'contentHTML', 'contentMarkdown']
                        },
                        { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                        {
                            model: db.Doctor_infor,
                            include: [
                                { model: db.Allcode, as: 'priceTypeData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Allcode, as: 'provinceTypeData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Allcode, as: 'paymentTypeData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Specialty, as: 'specialtyTypeData', attributes: ['name', 'id'] },
                                { model: db.Clinic, as: 'clinicTypeData', attributes: ['name', 'id'] },

                            ],


                        },




                    ],

                    raw: true,
                    nest: true

                })

                if (data && data.image) {
                    data.image = new Buffer(data.image, 'base64').toString('binary')
                }
                resolve({
                    errCode: 0,
                    data
                })
            }



        }
        catch (err) {
            reject(err)
        }
    })
}




let bulkCreateSchedule = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!data.arrSchedule || !data.doctorId || !data.formattedDate) {
                return {
                    errCode: 1,
                    message: 'Missing schedule parameter'
                }

            }

            else {
                let schedule = data.arrSchedule
                if (schedule && schedule.length > 0) {
                    schedule = schedule.map(
                        (item) => {
                            item.maxNumber = MAX_NUMBER_SCHEDULE
                            return item
                        }
                    )
                }

                let existing = await db.Schedule.findAll({
                    where: {
                        doctorId: data.doctorId,
                        date: data.formattedDate
                    },
                    attributes: ['doctorId', 'date', 'timeType'],
                    raw: true

                })





                let toCreate = _.differenceWith(schedule, existing, (a, b) => {
                    return a.timeType === b.timeType && a.date === b.date
                })
                if (toCreate && toCreate.length > 0) {

                    await db.Schedule.bulkCreate(toCreate)
                }
                resolve({
                    errCode: 0,
                    errMessage: 'done'
                })

            }
            resolve('')

        }
        catch (err) {
            reject(err)
        }
    })
}


let GetScheduleDoctorByDate = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId || !date) {

                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            }
            else {
                let dataSchedule = await db.Schedule.findAll({
                    where: {
                        doctorId: doctorId,
                        date: date
                    },
                    include: [
                        { model: db.Allcode, as: 'timeTypeData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.User, as: 'doctorData', attributes: ['firstName', 'lastName'] }

                    ],
                    raw: true,
                    nest: true
                })
                resolve({
                    errCode: 0,
                    data: dataSchedule
                })

            }


        }
        catch (err) {
            reject(err)
        }

    })

}

let GetExtraInfoDotorById = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId) {
                resolve({
                    errCode: 1,
                    message: 'Missing required parameter'
                })
            }
            else {
                let data = await db.Doctor_infor.findOne({
                    where: { doctorId: doctorId },
                    include: [
                        { model: db.Allcode, as: 'priceTypeData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcode, as: 'provinceTypeData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcode, as: 'paymentTypeData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Clinic, as: 'clinicTypeData', attributes: ['name'] },

                    ],
                    raw: true,
                    nest: true
                })
                if (!data || data.length <= 0) {
                    data = {}
                }

                resolve({
                    error: 0,
                    data: data
                })


            }
        }
        catch (err) {
            console.error(err)
            reject(err)

        }
    })
}


let GetProfileDotorById = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId) {
                resolve({
                    errCode: 1,
                    message: 'Missing required parameter'
                })
            }
            else {
                let data = await db.User.findOne({
                    where: { id: doctorId },
                    attributes: { exclude: ['password'] },
                    include: [
                        { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                        {
                            model: db.Doctor_infor,
                            include: [
                                { model: db.Allcode, as: 'priceTypeData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Allcode, as: 'provinceTypeData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Allcode, as: 'paymentTypeData', attributes: ['valueEn', 'valueVi'] },

                            ],


                        },
                        {
                            model: db.Markdown,
                            attributes: ['description']
                        },


                    ],

                    raw: false,
                    nest: true

                })
                if (!data) { data = [] }

                resolve({
                    errCode: 0,
                    message: data
                })

            }
        }
        catch (err) {
            console.error(err)
            reject(err)

        }
    })

}

let getListPatientForDoctor = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {

        try {
            if (!doctorId || !date) {
                resolve({
                    errCode: 1,
                    message: 'Missing parameter'
                })
            }
            else {
                let data = await db.Booking.findAll({
                    where: {

                        doctorId: doctorId,
                        date: date,
                        statusId: 'S2'
                    },
                    include: [

                        // timeTypeDataPatient
                        {
                            model: db.User, as: 'patientData',
                            attributes: ['email', 'firstName', 'gender', 'address', 'phonenumber']
                        },
                        {
                            model: db.Allcode, as: 'timeTypeDataPatient',
                            attributes: ['valueEn', 'valueVi']
                        },

                    ],
                    raw: true,
                    nest: true
                })


                resolve({
                    errCode: 0,
                    data: data
                })
            }

        }
        catch (err) {
            reject(err)
        }
    })
}

module.exports = {


    getTopDoctorHome,
    getAllDoctors,
    saveInforDoctor,
    getDetailDoctor,
    bulkCreateSchedule,
    GetScheduleDoctorByDate,
    GetExtraInfoDotorById,
    GetProfileDotorById,
    getListPatientForDoctor


}
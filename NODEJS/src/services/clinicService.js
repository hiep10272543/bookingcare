import db from '../models/index'


let createNewClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.descriptionHTML
                || !data.descriptionMarkdown || !data.imageBase64 || !data.address) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            }
            else {
                await db.Clinic.create({

                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown,
                    image: data.imageBase64,
                    name: data.name,
                    address: data.address
                })
                resolve({
                    errCode: 0,
                    errMessage: 'Done creating'
                })
            }

        }
        catch (err) {
            reject(err)
        }
    })
}

let getAllClinic = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Clinic.findAll()
            if (data && data.length > 0) {
                data.forEach(item => {
                    item.image = new Buffer(item.image, 'base64').toString('binary')

                })
            }
            resolve({
                errCode: 0,
                data: data,
                errMessage: 'oke'
            })

        }
        catch (err) {
            reject(err)
        }
    })
}

let getDetailClinicById = (inputId) => {
    return new Promise(async (resolve, reject) => {

        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            }
            else {
                let data = {}
                data = await db.Clinic.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: ['descriptionMarkdown', 'descriptionHTML', 'name'],

                })
                if (!data) {

                    data = {

                    }
                }
                else {
                    let doctorClinic = []


                    doctorClinic = await db.Doctor_infor.findAll({
                        where: {
                            clinicId: inputId
                        },
                        attributes: ['doctorId', 'provinceId'],

                    })

                    data.doctorClinic = doctorClinic
                }


                resolve({
                    errCode: 0,
                    data: data,
                    errMessage: 'oke'
                })

            }


        }
        catch (err) {
            reject(err)
        }
    })
}

let DeleteClinicById = (id) => {

    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    message: 'Missing parameter'
                })
            }
            else {
                let clinic = await db.Clinic.findOne({ where: { id: id }, raw: false })
                if (!clinic) {
                    resolve({
                        errCode: 2,
                        message: 'the user is not exist'
                    })
                }

                await clinic.destroy()
                resolve({
                    errCode: 0,
                    message: 'done delete'
                })

            }


        }
        catch (err) {
            reject(err)
        }
    })

}


let EditClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.descriptionHTML
                || !data.descriptionMarkdown || !data.imageBase64 || !data.address) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            }
            else {

                let clinic = await db.Clinic.findOne({
                    where: { id: data.id }, raw: false

                })
                if (clinic) {
                    clinic.name = data.name;
                    clinic.descriptionMarkdown = data.descriptionMarkdown;
                    clinic.descriptionHTML = data.descriptionHTML;
                    clinic.image = data.imageBase64
                    clinic.address =data.address;


                    await clinic.save();
                    resolve({
                        errCode: 0,
                        message: 'update done'
                    });



                } else {
                    resolve({
                        errCode: 1,
                        message: 'user not found'
                    });

                }

            }

        }
        catch (err) {
            reject(err)
        }
    })

}



module.exports = {
    createNewClinic, getAllClinic,
    getDetailClinicById,
    DeleteClinicById,
    EditClinic

}
import db from '../models/index'


let CreateNewSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.descriptionHTML
                || !data.descriptionMarkdown || !data.imageBase64) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            }
            else {
                await db.Specialty.create({
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown,
                    image: data.imageBase64,
                    name: data.name,
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

let getAllSpecialty = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Specialty.findAll({

            })
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

let getDetailSpecialtyById = (inputId, location) => {
    return new Promise(async (resolve, reject) => {

        try {
            if (!inputId || !location) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            }
            else {
                let data = {}
                data = await db.Specialty.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: ['descriptionMarkdown', 'descriptionHTML'],

                })
                if (!data) {

                    data = {

                    }
                }
                else {
                    let doctorSpecialty = []
                    if (location === "ALL") {

                        doctorSpecialty = await db.Doctor_infor.findAll({
                            where: {
                                specialtyId: inputId
                            },
                            attributes: ['doctorId', 'provinceId'],

                        })
                    }
                    else {
                        doctorSpecialty = await db.Doctor_infor.findAll({
                            where: {
                                specialtyId: inputId,
                                provinceId: location
                            },
                            attributes: ['doctorId', 'provinceId'],

                        })
                    }
                    data.doctorSpecialty = doctorSpecialty
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

let DeleteSpecialtyById = (id) => {

    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    message: 'Missing parameter'
                })
            }
            else {
                let spec = await db.Specialty.findOne({ where: { id: id }, raw: false })
                if (!spec) {
                    resolve({
                        errCode: 2,
                        message: 'the user is not exist'
                    })
                }

                await spec.destroy()
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


let EditSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.descriptionHTML
                || !data.descriptionMarkdown || !data.imageBase64) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            }
            else {

                let spec = await db.Specialty.findOne({
                    where: { id: data.id }, raw: false

                })
                if (spec) {
                    spec.name = data.name;
                    spec.descriptionMarkdown = data.descriptionMarkdown;
                    spec.descriptionHTML = data.descriptionHTML;
                    spec.image = data.imageBase64


                    await spec.save();
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
    CreateNewSpecialty,
    getAllSpecialty,
    getDetailSpecialtyById,
    DeleteSpecialtyById,
    EditSpecialty
}
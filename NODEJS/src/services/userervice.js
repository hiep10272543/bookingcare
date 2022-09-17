import db from '../models/index'
let bcrypt = require("bcryptjs");
let salt = bcrypt.genSaltSync(10);


let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            let isExist = await checkEmail(email)
            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ["id", "email", "roleId", "password", "firstName", "lastName"],
                    where: { email: email },
                    raw: true
                })
                if (user) {
                    const match = await bcrypt.compare(password, user.password);
                    if (match) {
                        userData.errCode = 0;
                        userData.errMessage = `oke`
                        delete user.password
                        userData.user = user
                    }
                    else {
                        userData.errCode = 3;
                        userData.errMessage = `wrong password`
                    }
                }
                else {
                    userData.errCode = 2;
                    userData.errMessage = `user is not found~`
                }
            }
            else {
                userData.errCode = 1;
                userData.errMessage = `Your's Email isn't exist on your system. Please try again`
            }
            resolve(userData)
        }
        catch (err) {
            reject(err)
        }
    })
}


let checkEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            }
            resolve(false)
        }
        catch (err) {
            reject(err)
        }
    })
}



let getAllUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = ''
            if (id === 'all') {
                user = await db.User.findAll({
                    raw: true, attributes: {
                        exclude: ['password']
                    }
                })


            }
            else if (id && id !== 'all') {
                user = await db.User.findOne({
                    where: { id: id },
                    raw: true,
                    attributes: {
                        exclude: ['password']
                    }
                })

            }

            resolve(user)
        }
        catch (err) {
            reject(err)
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hash = await bcrypt.hashSync(password, salt);
            resolve(hash);
        } catch (e) {
            reject(e);
        }
    });
};

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.password) {
                resolve({
                    errCode: 2,
                    message: 'Missing parameter'
                });
            }
            else {

                let check = await checkEmail(data.email);
                if (check) {
                    resolve({
                        errCode: 1,
                        message: 'Your email is already in used. Please try again'
                    });
                }
                else if(data.password.length < 6) {
                    resolve({
                        errCode: 3,
                        message: 'Password must be more than 6 characters'
                    });
                }
                else {
                    let hash = await hashUserPassword(data.password);
                    await db.User.create({
                        email: data.email,
                        password: hash,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        address: data.address,
                        gender: data.gender,
                        roleId: data.roleId,
                        phonenumber: data.phonenumber,
                        positionId: data.positionId,
                        image: data.avatar,
                    });
                    resolve({
                        errCode: 0,
                        message: 'ok'
                    });
                }

            }


        }
        catch (err) {
            reject(err)
        }
    })
}
let deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ where: { id: id }, raw: false })
            if (!user) {
                resolve({
                    errCode: 2,
                    message: 'the user is not exist'
                })
            }

            await user.destroy()
            resolve({
                errCode: 0,
                message: 'done delete'
            })

        }
        catch (err) {
            reject(err)
        }
    })
}


let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }, raw: false

            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                if (data.avatar) {
                    user.image = data.avatar;

                }


                await user.save();
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
        catch (err) {
            reject(err)
        }
    })
}

let getAllCode = (type) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Allcode.findAll({ where: { type: type } })
            if (!data) {
                resolve({
                    errCode: 1,
                    message: 'Missing param.....'
                })
            }
            else {
                resolve({
                    errCode: 0,
                    message: data
                })
            }

        }
        catch (err) {
            reject(err)
        }
    })
}




module.exports = {
    handleUserLogin,
    getAllUser,
    createNewUser,
    deleteUser,
    updateUserData,
    getAllCode,

}
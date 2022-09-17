import db from "../models/index";
let bcrypt = require("bcryptjs");
let salt = bcrypt.genSaltSync(10);

let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hash = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hash,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        gender: data.gender === "1" ? true : false,
        roleId: data.roleId,
        phonenumber: data.phonenumber
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

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

let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        raw: true,
      });
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNewUser,
  getAllUser,
};

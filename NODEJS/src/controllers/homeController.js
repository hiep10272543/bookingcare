import db from "../models/index";
import { createNewUser, getAllUser } from "../services/CRUDservice";
let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();

    return res.render("homepage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }
};

let getCRUD = async (req, res) => {
  try {
    return res.render("crudpage.ejs");
  } catch (error) {
    console.log(error);
  }
};
let postCRUD = async (req, res) => {
  await createNewUser(req.body);
  return res.render("crudpage.ejs");
};

let getDisplayCRUD = async (req, res) => {
  let dataUser = await getAllUser();

  return res.render("displayCRUD.ejs", {
    data: dataUser,
  });
};

module.exports = {
  getHomePage,
  getCRUD,
  postCRUD,
  getDisplayCRUD,
};

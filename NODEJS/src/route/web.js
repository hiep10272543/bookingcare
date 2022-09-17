import express from "express";
import {
  getHomePage,
  getCRUD,
  postCRUD,
  getDisplayCRUD,
} from "../controllers/homeController";
import {
  handleGetTopDoctor,
  handleGetAllDoctor,
  handlePostInforDoctor,
  getDetailDoctorById,
  handleBulkCreateSchedule,
  handleGetScheduleDoctorByDate,
  handleGetExtraInfoDotorById,
  handleGetProfileDotorById,
  handleGetListPatientForDoctor


} from "../controllers/doctorController";

import {
  handlePostBookAppointment,
  handleVerifyBookAppointment,
  handleSendRemedy
} from "../controllers/paitentControlle"

import { handleCreateNewSpecialty, handleGetAllSpecialty, handleGetDetailSpecialtyById, handleDeleteSpecialtyById, handleEditSpecialty } from "../controllers/specialtyController"
import {
  handleCreateNewClinic, handleGetAllClinic, handleGetDetailClinicById,
  handleDeleteClinicById,
  handleEditClinic
} from "../controllers/clinicController"


import { handleGetAllUser, handleLogin, handleCreateNewUser, handleDeleteUser, handleEditUser, handleGetAllCode } from "../controllers/userController"
let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", getHomePage);
  router.get("/crud", getCRUD);
  router.post("/crud", postCRUD);
  router.get("/get-crud", getDisplayCRUD);

  router.post("/api/login", handleLogin)
  router.get("/api/get-all-user", handleGetAllUser)
  router.post("/api/create-new-user", handleCreateNewUser)
  router.delete("/api/delete-user", handleDeleteUser);
  router.put("/api/edit-user", handleEditUser);
  router.get('/api/allcode', handleGetAllCode);

  router.get('/api/top-doctor-home', handleGetTopDoctor);
  router.post('/api/save-info-doctors', handlePostInforDoctor);
  router.get('/api/get-detail-doctor', getDetailDoctorById);

  router.get('/api/get-all-doctor', handleGetAllDoctor);
  router.post('/api/bulk-create-schedule', handleBulkCreateSchedule);
  router.get('/api/get-schedule-doctor-by-date', handleGetScheduleDoctorByDate);
  router.get('/api/get-extra-info-dotor-by-id', handleGetExtraInfoDotorById);
  router.get('/api/get-profile-dotor-by-id', handleGetProfileDotorById);


  router.post('/api/patient-book-appointment', handlePostBookAppointment);
  router.post('/api/verify-book-appointment', handleVerifyBookAppointment);



  router.post('/api/create-new-specialty', handleCreateNewSpecialty);
  router.get('/api/get-all-specialty', handleGetAllSpecialty);
  router.get('/api/get-detail-specialty-by-id', handleGetDetailSpecialtyById);
  router.delete("/api/delete-specialty-by-id", handleDeleteSpecialtyById);
  router.put("/api/edit-specialty", handleEditSpecialty);

  // 



  router.post('/api/create-new-clinic', handleCreateNewClinic);
  router.get('/api/get-clinic', handleGetAllClinic);
  router.get('/api/get-detail-clinic-by-id', handleGetDetailClinicById);
  router.delete("/api/delete-clinic-by-id", handleDeleteClinicById);
  router.put("/api/edit-clinic", handleEditClinic);



  router.get('/api/get-list-patient-for-doctor', handleGetListPatientForDoctor);
  router.post('/api/send-remedy', handleSendRemedy);



  return app.use("/", router);
};

module.exports = initWebRoutes;

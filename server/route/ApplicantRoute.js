import express from 'express'
import { create, deleteApplicantById, getAllApplicants, getApplicantById, updateApplicantById } from '../controller/ApplicantController.js';

const applicantRoute = express.Router();

applicantRoute.post('/create', create);
applicantRoute.get("/", getAllApplicants);
applicantRoute.get("/findById/:id", getApplicantById)
applicantRoute.put("/updateById/:id", updateApplicantById);
applicantRoute.delete("/deleteById/:id", deleteApplicantById);

export default applicantRoute;
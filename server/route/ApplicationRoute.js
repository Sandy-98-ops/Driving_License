import express from 'express'
import { create, deleteApplicationById, getAllApplications, getApplicationById, updateApplicationById } from '../controller/ApplicationController.js';

const applicationRoute = express.Router();

applicationRoute.post('/create', create);
applicationRoute.get("/", getAllApplications);
applicationRoute.get("/findById/:id", getApplicationById)
applicationRoute.put("/updateById/:id", updateApplicationById);
applicationRoute.delete("/deleteById/:id", deleteApplicationById);

export default applicationRoute;
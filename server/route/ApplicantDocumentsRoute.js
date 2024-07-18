import express from "express";
import { upload } from "../utils/multer-config.js";
import { create, getAllApplicantsDocuments } from "../controller/ApplicantDocumentController.js";


const applicantDocumentsRoute = new express.Router();

applicantDocumentsRoute.post('/upload', upload.fields([
    { name: 'aadharCard', maxCount: 1 },
    { name: 'panCard', maxCount: 1 },
    { name: 'addressProof', maxCount: 1 }
]), create);

applicantDocumentsRoute.get("/", getAllApplicantsDocuments);

export default applicantDocumentsRoute;



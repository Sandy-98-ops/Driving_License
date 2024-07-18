
import { generateOTP } from '../utils/GenerateRandomText.js';
import { sendOTPForLLApply } from '../utils/EmailService.js';
import ApplicantDocuments from '../models/ApplicantDocuments.js';

export const create = async (req, res) => {
    try {
        const { applicant } = req.body;
        const files = req.files;

        const aadharCard = files?.aadharCard?.[0]?.path;
        const panCard = files?.panCard?.[0]?.path;
        const addressProofPath = files?.addressProof?.[0]?.path;

        const newApplicantDocs = new ApplicantDocuments({
            applicant,
            pan: panCard,
            aadhar: aadharCard,
            addressProof: addressProofPath,
        });

        await newApplicantDocs.save();

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `Server Error ${error}` });
    }
};

export const getAllApplicantsDocuments = async (req, res) => {

    try {
        return res.status(200).json(await ApplicantDocuments.find());

    } catch (error) {
        return res.status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}

export const getApplicantById = async (req, res) => {
    try {
        const id = req.params.id;

        if (id) {
            const student = await ApplicantDocuments.findById(id);
            if (!student) {
                return res.status(400)
                    .json({ message: "ApplicantDocuments not Found" });
            }
            return res.status(200)
                .json(student);
        }

    } catch (error) {
        return res.status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}

export const updateApplicantDocumentById = async (req, res) => {
    try {

        const id = req.params.id;

        const student = req.body;

        if (student) {
            await ApplicantDocuments.findByIdAndUpdate(id, student, { new: true });
            return res.status(200)
                .json({ message: "Data Updated Successfully" });
        }

    } catch (error) {
        return res.status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}

export const deleteApplicantDocumentById = async (req, res) => {
    try {

        const id = req.params.id;

        await ApplicantDocuments.findByIdAndDelete(id);

        return res.status(200)
            .json({ message: "Record deleted successfully" })

    } catch (error) {
        return res.status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}


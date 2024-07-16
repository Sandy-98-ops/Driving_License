
import bcrypt from 'bcrypt'
import ApplicantModel from '../models/ApplicantModel.js';

export const create = async (req, res) => {
    try {
        console.log(req.body)
        const applicant = new ApplicantModel(req.body)

        const email = applicant.email;

        const existingUser = await ApplicantModel.findOne({ email })

        if (existingUser) {
            return res.status(400)
                .json({ message: "User already Exists" });
        }

        await applicant.save();

        return res.status(200)
            .json({ message: "User Data saved successfully" })
    } catch (error) {
        return res.status(500)
            .json({ message: `Server Error ${error}` })
    }
}

export const getAllApplicants = async (req, res) => {

    try {
        return res.status(200).json(await ApplicantModel.find());

    } catch (error) {
        return res.status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}

export const getApplicantById = async (req, res) => {
    try {
        const id = req.params.id;

        if (id) {
            const student = await ApplicantModel.findById(id);
            if (!student) {
                return res.status(400)
                    .json({ message: "ApplicantModel not Found" });
            }
            return res.status(200)
                .json(student);
        }

    } catch (error) {
        return res.status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}

export const updateApplicantById = async (req, res) => {
    try {

        const id = req.params.id;

        const student = req.body;

        if (student) {
            await ApplicantModel.findByIdAndUpdate(id, student, { new: true });
            return res.status(200)
                .json({ message: "Data Updated Successfully" });
        }

    } catch (error) {
        return res.status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}

export const deleteApplicantById = async (req, res) => {
    try {

        const id = req.params.id;

        await ApplicantModel.findByIdAndDelete(id);

        return res.status(200)
            .json({ message: "Record deleted successfully" })

    } catch (error) {
        return res.status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}
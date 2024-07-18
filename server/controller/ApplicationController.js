
import bcrypt from 'bcrypt'
import ApplicationModel from '../models/ApplicationModel.js';

export const create = async (req, res) => {
    try {
        console.log(req.body)
        const application = new ApplicationModel(req.body)

        const email = application.email;

        const existingUser = await ApplicationModel.findOne({ email })

        if (existingUser) {
            return res.status(400)
                .json({ message: "Application already Exists" });
        }

        await application.save();

        return res.status(200)
            .json(application)
    } catch (error) {
        return res.status(500)
            .json({ message: `Server Error ${error}` })
    }
}

export const getAllApplications = async (req, res) => {

    try {
        return res.status(200).json(await ApplicationModel.find());

    } catch (error) {
        return res.status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}

export const getApplicationById = async (req, res) => {
    try {
        const id = req.params.id;

        if (id) {
            const student = await ApplicationModel.findById(id);
            if (!student) {
                return res.status(400)
                    .json({ message: "ApplicationModel not Found" });
            }
            return res.status(200)
                .json(student);
        }

    } catch (error) {
        return res.status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}

export const updateApplicationById = async (req, res) => {
    try {

        const id = req.params.id;

        const data = req.body;

        if (data) {
            await ApplicationModel.findByIdAndUpdate(id, data, { new: true });
            return res.status(200)
                .json({ message: "Data Updated Successfully" });
        }

    } catch (error) {
        return res.status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}

export const deleteApplicationById = async (req, res) => {
    try {

        const id = req.params.id;

        await ApplicationModel.findByIdAndDelete(id);

        return res.status(200)
            .json({ message: "Record deleted successfully" })

    } catch (error) {
        return res.status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}

import ApplicantModel from '../models/ApplicantModel.js';
import { generateOTP } from '../utils/GenerateRandomText.js';
import { sendOTPForLLApply } from '../utils/EmailService.js';

export const create = async (req, res) => {
    try {
        console.log(req.body)
        const applicant = new ApplicantModel(req.body)

        const email = applicant.email;

        const existingUser = await ApplicantModel.findOne({ email })

        if (!existingUser) {
            applicant.otp = generateOTP(4);
            await applicant.save();
            sendOTPForLLApply(applicant.email, applicant.otp)

            return res.status(200).
                json({ message: 'OTP sent to your email', data: existingUser })
        } else {
            existingUser.otp = generateOTP(4)
            await ApplicantModel.findByIdAndUpdate(existingUser._id, existingUser, { new: true });
            sendOTPForLLApply(existingUser.email, existingUser.otp)

            return res.status(200).
                json({ message: 'OTP sent to your email', data: existingUser })
        }


    } catch (error) {
        console.log(error)
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

export const login = async (req, res) => {
    const { email, otp } = req.body;
    console.log(req.body)
    try {
        const citizen = await ApplicantModel.findOne({ email });
        console.log(citizen)

        if (!citizen) {
            return res.status(404)
                .json({ message: "citizen not found" });
        }

        if (otp !== citizen.otp) {
            return res.status(401).
                json({ message: "Invalid OTP", status: 0 })
        }

        return res.status(200).
            json({ citizen })

    } catch (error) {
        return res.status(500)
            .json({ message: `Server Error ${error}` })
    }
}
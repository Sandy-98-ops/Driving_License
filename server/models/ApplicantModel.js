import mongoose, { Schema } from "mongoose";

const applicantModel = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    otp: {
        type: String
    }
})

export default mongoose.model("Applicant", applicantModel);
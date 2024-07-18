import mongoose, { Schema } from "mongoose";

const applicantModel = new Schema({

    email: {
        type: String
    },
    otp: {
        type: String
    }
})

export default mongoose.model("Applicant", applicantModel);
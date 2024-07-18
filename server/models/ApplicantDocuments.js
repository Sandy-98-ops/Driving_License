import mongoose, { Schema } from "mongoose";


const applicantDocumentsSchema = new Schema({
    applicant: {
        type: Schema.Types.ObjectId,
        ref: 'Applicant',
        required: true
    },
    aadhar: {
        type: String
    },
    pan: {
        type: String
    },
    addressProof: {
        type: String
    }
})

export default mongoose.model("ApplicantDocuments", applicantDocumentsSchema);
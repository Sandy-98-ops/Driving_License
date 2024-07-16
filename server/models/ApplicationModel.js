
import mongoose, { Schema } from 'mongoose';


const applicationModel = new Schema({

    applicant: {

    },
    state: {
        type: String
    },
    rtoOffice: {
        type: String
    },
    firstName: {
        type: String
    },
    middleName: {
        type: String
    },
    lastName: {
        type: String
    },
    relationFirstName: {
        type: String
    },
    relationMiddleName: {
        type: String
    },
    relationLastName: {
        type: String
    },
    gender: {
        type: String
    },
    dob: {
        type: String
    },
    placeOfBirth: {
        type: String
    },
    countryOfBirth: {
        type: String
    },
    qualification: {
        type: String
    },
    bloodGroup: {
        type: String
    },
    email: {
        type: String
    },
    mobileNumber: {
        type: String
    },
    identificationMarks_1: {
        type: String
    },
    identificationMarks_2: {
        type: String
    },
    address: {
        state: {
            type: String
        },
        district: {
            type: String
        },
        taluka: {
            type: String
        },
        village: {
            type: String
        },
        town: {
            type: String
        },
        houseNo: {
            type: String
        },
        street: {
            type: String
        },
        landMark: {
            type: String
        },
        pinCode: {
            type: String
        },
        permanentState: {
            type: String
        },
        permanentDistrict: {
            type: String
        },
        permanentTaluka: {
            type: String
        },
        permanentVillage: {
            type: String
        },
        permanentTown: {
            type: String
        },
        permanentHouseNo: {
            type: String
        },
        permanentStreet: {
            type: String
        },
        permanentLandMark: {
            type: String
        },
        permanentPinCode: {
            type: String
        }
    },
    classOfVehicle: {
        type: [String]
    }

})

export default mongoose.model("Application", applicationModel);
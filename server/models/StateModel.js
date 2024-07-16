import mongoose, { Schema } from 'mongoose';

// Define the schema for a state
const stateSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true,
        enum: ['state', 'union_territory']
    }
});

// Export the model
export default mongoose.model('State', stateSchema);

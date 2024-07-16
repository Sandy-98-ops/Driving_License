import State from "../models/StateModel.js";

// Create a new state
export const createState = async (req, res) => {
    const { name, type } = req.body;
    try {
        const newState = new State({ name, type });
        await newState.save();
        res.status(201).json(newState);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Read all states
export const getStates = async (req, res) => {
    try {
        const states = await State.find();
        res.status(200).json(states);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Read a single state by ID
export const getStateById = async (req, res) => {
    const { id } = req.params;
    try {
        const state = await State.findById(id);
        if (!state) {
            return res.status(404).json({ message: 'State not found' });
        }
        res.status(200).json(state);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a state by ID
export const updateState = async (req, res) => {
    const { id } = req.params;
    const { name, type } = req.body;
    try {
        const state = await State.findByIdAndUpdate(id, { name, type }, { new: true, runValidators: true });
        if (!state) {
            return res.status(404).json({ message: 'State not found' });
        }
        res.status(200).json(state);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a state by ID
export const deleteState = async (req, res) => {
    const { id } = req.params;
    try {
        const state = await State.findByIdAndDelete(id);
        if (!state) {
            return res.status(404).json({ message: 'State not found' });
        }
        res.status(200).json({ message: 'State deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

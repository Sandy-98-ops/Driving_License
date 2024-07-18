import express from 'express';

import { createState, getStates, getStateById, updateState, deleteState } from '../controller/StatesController.js';

const stateRouter = express.Router();

// Route to create a new state
stateRouter.post('/create', createState);

// Route to get all states
stateRouter.get('/', getStates);

// Route to get a single state by ID
stateRouter.get('/states/:id', getStateById);

// Route to update a state by ID
stateRouter.put('/states/:id', updateState);

// Route to delete a state by ID
stateRouter.delete('/states/:id', deleteState);

export default stateRouter;

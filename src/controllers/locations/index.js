import express from 'express';
import { authenticate } from '../authentication/authenticate';
import { createLocation, validateLocation } from './createLocation';
import { listLocations, getOneLocation } from './listLocations';
import { updateLocation, deleteLocation, validateLocationToUpdate } from './updateDeleteLocation';


const locationsRouter = express.Router();

locationsRouter.post('/locations', authenticate, validateLocation, createLocation);
locationsRouter.get('/locations', authenticate, listLocations);
locationsRouter.get('/locations/:id', authenticate, getOneLocation);
locationsRouter.put('/locations/:id', authenticate, validateLocationToUpdate, updateLocation);
locationsRouter.delete('/locations/:id', authenticate, deleteLocation);

export default locationsRouter;

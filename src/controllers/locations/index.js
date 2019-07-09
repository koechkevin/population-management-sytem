import express from 'express';
import { authenticate } from '../authentication/authenticate';
import { createLocation } from './createLocation';
import { listLocations, getOneLocation } from './listLocations';
import { updateLocation, deleteLocation } from './updateDeleteLocation';


const locationsRouter = express.Router();

locationsRouter.post('/locations', authenticate, createLocation);
locationsRouter.get('/locations', authenticate, listLocations);
locationsRouter.get('/locations/:id', authenticate, getOneLocation);
locationsRouter.put('/locations/:id', authenticate, updateLocation);
locationsRouter.delete('/locations/:id', authenticate, deleteLocation);

export default locationsRouter;

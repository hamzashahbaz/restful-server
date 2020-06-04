import express from 'express';
const routes = express.Router();

import userRoutes from './user';

routes.use('/users', userRoutes);

export default routes;

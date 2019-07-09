import express from 'express';
import authRouter from './authentication';

const routers = [authRouter];
const router = express.Router();

const routes = (app) => {
  routers.forEach((route) => {
    router.use(route);
  });
  app.use('/api', router);
  return app;
};

export default routes;

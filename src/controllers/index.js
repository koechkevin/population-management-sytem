import express from 'express';
import authRouter from './authentication';
import locationsRouter from './locations';

const routers = [authRouter, locationsRouter];
const router = express.Router();

const routes = (app) => {
  routers.forEach((route) => {
    router.use(route);
  });
  app.use('/api', router);
  return app;
};

export default routes;

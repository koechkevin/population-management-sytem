import supertest from 'supertest';
import models from './database/models';
import app from './app';

export const destroyTable = async () => {
  await models.User.destroy({ force: true, truncate: { cascade: true } });
};

export const postTestClient = ({
  url, data, done, status,
}) => {
  const request = supertest(app);
  request.post(url).send(data).end((err, res) => {
    if (err) done(err);
    expect(res.status).toEqual(status);
    done();
  });
};

export const createUser = async (user) => {
  await models.User.create(user);
};

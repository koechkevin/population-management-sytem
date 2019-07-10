import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import models from './database/models';
import app from './app';

export const destroyTable = async () => {
  await models.User.destroy({ force: true, truncate: { cascade: true } });
};

export const generateToken = () => {
  const contact = {
    name: 'Kevin Koech',
    phone: 730567893,
    email: 'string@string.com',
    password: '$2b$10$ns07YC0wq3uwudUiZ3uHY.LXcoMsPNgGGCzcBt.rSMmTZUVI0nCWO',
    updatedAt: '2019-07-09T15:59:13.745Z',
    createdAt: '2019-07-09T15:59:13.745Z',
  };
  return jwt.sign({
    id: contact.id, myNumber: contact.phone, name: contact.name, email: contact.email,
  }, process.env.SECRET_KEY, { expiresIn: '12h' });
};

const request = supertest(app);

export const postTestClient = ({
  url, data, done, status,
}) => {
  request.post(url)
    .set({ Authorization: generateToken() })
    .send(data).end((err, res) => {
      if (err) done(err);
      expect(res.status).toEqual(status);
      done();
    });
};

export const getClient = ({ url, done, status }) => {
  request.get(url).set({ Authorization: generateToken() })
    .end((err, res) => {
      if (err) done(err);
      expect(res.status).toEqual(status);
      done();
    });
};

export const editClient = ({
  url, data, done, status,
}) => {
  request.put(url)
    .set({ Authorization: generateToken() })
    .send(data).end((err, res) => {
      if (err) done(err);
      expect(res.status).toEqual(status);
      done();
    });
};

export const deleteClient = ({ url, done, status }) => {
  request.delete(url)
    .set({ Authorization: generateToken() })
    .end((err, res) => {
      if (err) done(err);
      expect(res.status).toEqual(status);
      done();
    });
};

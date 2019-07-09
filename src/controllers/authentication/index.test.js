import { destroyTable, postTestClient } from '../../testSetup';

describe('test', () => {
  afterAll(async () => {
    await destroyTable();
  });
  const user = {
    name: 'Kevin Koech',
    phone: 730567893,
    email: 'string@string.com',
    password: '$2b$10$ns07YC0wq3uwudUiZ3uHY.LXcoMsPNgGGCzcBt.rSMmTZUVI0nCWO',
    updatedAt: '2019-07-09T15:59:13.745Z',
    createdAt: '2019-07-09T15:59:13.745Z',
    id: 1,
  };
  const testData = {
    url: '/api/auth/register', data: user, status: 201,
  };
  it('passes', (done) => {
    postTestClient({ ...testData, done });
  });
  it('throws 422 error if data is invalid', (done) => {
    const values = {
      url: '/api/auth/login', done, data: {}, status: 422,
    };
    postTestClient(values);
  });
  it('throws 422 error if data is invalid', (done) => {
    const values = {
      url: '/api/auth/register', done, data: {}, status: 422,
    };
    postTestClient(values);
  });
  it('tests login', (done) => {
    const values = { ...testData, url: '/api/auth/login' };
    delete values.data.phone;
    postTestClient({ ...values, status: 200, done });
  });
  it('tests login 2', async (done) => {
    postTestClient({
      ...testData, data: { ...user, password: 'string' }, status: 422, done,
    });
  });

  it('tests login', (done) => {
    const values = { ...testData, data: { ...user, password: 'yruieiii' }, url: '/api/auth/login' };
    delete values.data.phone;
    postTestClient({ ...values, status: 401, done });
  });

  it('tests login 2', async (done) => {
    const s = {
      phone: 780567893,
      password: 'string',
    };
    postTestClient({
      ...testData, url: '/api/auth/login', data: s, status: 404, done,
    });
  });
});

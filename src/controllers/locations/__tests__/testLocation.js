import {
  deleteClient, editClient, getClient, postTestClient,
} from '../../../testSetup';
import models from '../../../database/models';

const location = {
  id: 33333,
  name: 'Edited',
  males: 10,
  females: 123,
  parent: null,
  createdAt: '2019-07-10T06:10:57.365Z',
  updatedAt: '2019-07-10T08:25:04.999Z',
};

describe('test create location', () => {
  beforeAll(async () => {
    await models.Location.destroy({ force: true, truncate: { cascade: true } });
  });
  const body = {
    name: 'hello location',
    males: 10,
    females: 123,
  };
  it('creates location', (done) => {
    const testData = {
      data: body, url: '/api/locations', done, status: 201,
    };
    postTestClient(testData);
  });

  it('creates a nested location', async (done) => {
    await models.Location.create({ ...location, id: 1761 });
    const testData = {
      data: { ...body, parent: 1761 }, url: '/api/locations', done, status: 201,
    };
    postTestClient(testData);
  });

  it('validates the provided body parent', (done) => {
    const testData = {
      data: { ...body, parent: 1000 }, url: '/api/locations', done, status: 404,
    };
    postTestClient(testData);
  });
});

describe('test getting locations', () => {
  beforeAll(async () => {
    await models.Location.destroy({ force: true, truncate: { cascade: true } });
    await models.Location.create(location);
  });
  it('gets all locations successfully', (done) => {
    getClient({ url: '/api/locations', done, status: 200 });
  });

  it('gets one location successfully', (done) => {
    getClient({ url: '/api/locations/33333', done, status: 200 });
  });

  it('returns a status code of 404 if location not found', (done) => {
    getClient({ url: '/api/locations/333335', done, status: 404 });
  });

  it('gets nested locations', async (done) => {
    await models.Location.create({ ...location, id: 999999, parent: 33333 });
    getClient({ url: '/api/locations/999999', done, status: 200 });
  });
});

describe('tests update a location', () => {
  beforeAll(async () => {
    await models.Location.destroy({ force: true, truncate: { cascade: true } });
    await models.Location.create(location);
  });
  const body = {
    males: 110,
    name: 'edit location name',
    females: 1123,
    parent: 33333,
  };
  it('updates a location', async (done) => {
    editClient({
      data: body, url: '/api/locations/33333', done, status: 200,
    });
  });

  it('updates a location with single data', async (done) => {
    editClient({
      data: { name: 'test name' }, url: '/api/locations/33333', done, status: 200,
    });
  });

  it('returns error code of 400 if no update was executed', async (done) => {
    editClient({
      data: body, url: '/api/locations/23334', done, status: 400,
    });
  });

  it('returns error code of 404 if update data parent is not in the database', async (done) => {
    editClient({
      data: { ...body, parent: 888888 }, url: '/api/locations/33333', done, status: 404,
    });
  });
});

describe('test delete a location', () => {
  beforeEach(async () => {
    await models.Location.destroy({ force: true, truncate: { cascade: true } });
    await models.Location.create(location);
    await models.Location.create({ ...location, id: 999999, parent: 33333 });
  });
  it('deletes an existing location', async (done) => {
    deleteClient({ url: '/api/locations/33333', done, status: 200 });
  });
});

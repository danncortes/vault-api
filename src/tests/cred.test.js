const request = require('supertest');
const app = require('../app');
const { Cred } = require('../db/models/Cred');
const { testCredId, testUser, setUpDataBase } = require('./commonDb');
const { cryptData } = require('../helpers/cryptDecrypt');

describe('Cred model', () => {
  beforeEach(setUpDataBase);

  it('Should create new Cred', async () => {
    const data = 'this is a test cred';

    const response = await request(app).post('/cred')
      .set('Authorization', `Bearer ${testUser.tokens[0].token}`)
      .send({ data })
      .expect(201);

    // Assert saved encripted data
    const encryptedData = cryptData(data);
    expect(response.body.data).toBe(encryptedData);

    // Assert cred is saved in data base
    const cred = await Cred.findById(response.body._id);
    expect(cred).not.toBeNull();
  });

  it('Should not create new Cred when user is not authenticated', async () => {
    await request(app).post('/cred')
      .send({ data: 'this is a test cred' })
      .expect(401);
  });

  it('Should fetch Creds', async () => {
    await request(app).get('/cred')
      .set('Authorization', `Bearer ${testUser.tokens[0].token}`)
      .expect(201);
  });

  it('Should not fetch Creds if there is no authenticated user', async () => {
    await request(app).get('/cred')
      .expect(401);
  });

  it('Should find Cred', async () => {
    await request(app).get('/cred/' + testCredId)
      .set('Authorization', `Bearer ${testUser.tokens[0].token}`)
      .expect(200);
  });

  it('Should not find Cred if there is no authenticated user', async () => {
    await request(app).get('/cred/' + testCredId)
      .expect(401);
  });

  it('Should update Cred', async () => {
    const data = 'this is a test cred';
    const dataUpdated = 'this is a test cred ++';

    // Create a new Cred
    const response = await request(app).post('/cred')
      .set('Authorization', `Bearer ${testUser.tokens[0].token}`)
      .send({ data });

    // Updated it
    await request(app).patch('/cred/' + response.body._id)
      .set('Authorization', `Bearer ${testUser.tokens[0].token}`)
      .send({ data: dataUpdated })
      .expect(202);

    // Find it and assert if it's updated
    const cred = await request(app).get('/cred/' + response.body._id)
      .set('Authorization', `Bearer ${testUser.tokens[0].token}`);

    expect(cred.body.data).toBe(dataUpdated);
  });

  it('Should not update Cred if there is no authenticated user', async () => {
    const data = 'this is a test cred';
    const dataUpdated = 'this is a test cred ++';

    // Create a new Cred
    const response = await request(app).post('/cred')
      .set('Authorization', `Bearer ${testUser.tokens[0].token}`)
      .send({ data });

    // Updated it
    await request(app).patch('/cred/' + response.body._id)
      .send({ data: dataUpdated })
      .expect(401);
  });

  it('Should delete Cred', async () => {
    await request(app)
      .delete('/cred/' + testCredId)
      .set('Authorization', `Bearer ${testUser.tokens[0].token}`)
      .send()
      .expect(200);

    // Assert the Cred has been deleted
    const cred = await Cred.findById(testCredId);
    expect(cred).toBeNull();
  });

  it('Should not delete Cred Profile when user is not authenticated', async () => {
    await request(app)
      .delete('/cred/' + testCredId)
      .send()
      .expect(401);
  });
});

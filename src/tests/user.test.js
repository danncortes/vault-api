const request = require('supertest');
const app = require('../app');
const User = require('../db/models/User');
const { testUserId, testUser, setUpDataBase } = require('./commonDb');

describe('User model', () => {
  beforeEach(setUpDataBase);

  it('Should signup a new user', async () => {
    const response = await request(app).post('/users').send({
      name: 'Mark',
      email: 'makr@example.com',
      password: 'mark123'
    }).expect(201);

    // Assert the user was saved in DB
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    // Assertion about the response
    expect(response.body).toMatchObject({
      user: {
        name: 'Mark',
        email: 'makr@example.com',
      },
      token: user.tokens[0].token
    });

    // Assert no password in response
    expect(response.body.user.password).toBe(undefined);
  });

  it('Should login user', async () => {
    await request(app).post('/users/login').send({
      email: testUser.email,
      password: testUser.password
    }).expect(200);
  });

  it('Should not login nonexisting user', async () => {
    await request(app).post('/users/login').send({
      email: 'notEmail@example.com',
      password: testUser.password
    }).expect(400);
  });

  it('Should not login with wrong password', async () => {
    await request(app).post('/users/login').send({
      email: testUser.email,
      password: 'xxx'
    }).expect(400);
  });

  it('Should get User Profile', async () => {
    await request(app)
      .get('/users/me')
      .set('Authorization', `Bearer ${testUser.tokens[0].token}`)
      .send()
      .expect(200);
  });

  it('Should not get User Profile when user is not authenticated', async () => {
    await request(app)
      .get('/users/me')
      .send()
      .expect(401);
  });

  it('Should delete User Profile', async () => {
    await request(app)
      .delete('/users/me')
      .set('Authorization', `Bearer ${testUser.tokens[0].token}`)
      .send()
      .expect(200);

    // Assert the User has been deleted
    const user = await User.findById(testUserId);
    expect(user).toBeNull();
  });

  it('Should not delete User Profile when user is not authenticated', async () => {
    await request(app)
      .delete('/users/me')
      .send()
      .expect(401);
  });
});

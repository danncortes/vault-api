const request = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const app = require('../app');
const User = require('../db/models/User');
const { CIPHER_PASS } = process.env;

describe('User model', () => {
  const testUserId = new mongoose.Types.ObjectId();

  const testUser = {
    _id: testUserId,
    name: 'Jack',
    email: 'jack@example.com',
    password: 'jack123',
    tokens: [{
      token: jwt.sign({ _id: testUserId }, CIPHER_PASS)
    }]
  };

  beforeEach(async () => {
    await User.deleteMany();
    await new User(testUser).save();
  });

  it('Should signup a new user', async () => {
    await request(app).post('/users').send({
      name: 'Mark',
      email: 'makr@example.com',
      password: 'mark123'
    }).expect(201);
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
  });

  it('Should not delete User Profile when user is not authenticated', async () => {
    await request(app)
      .delete('/users/me')
      .send()
      .expect(401);
  });
});

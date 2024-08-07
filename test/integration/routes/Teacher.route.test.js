const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const { MongoDB } = require('../../../src/config/config');
const teacherRoute = require('../../../src/routes/Teacher.route');
require('@testing-library/jest-dom');

app.use(express.json());
app.use('/teacher', teacherRoute);

beforeAll(async () => {
  await mongoose.connect(MongoDB.url, MongoDB.options);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Teacher Routes', () => {
  test('POST /teacher/login should return token and isNew=true for new user', async () => {
    const response = await request(app)
      .post('/teacher/login')
      .send({ username: 'newuser', password: 'password' });

    expect(response.body).toEqual({
      token: expect.any(String),
      isLoggedIn: true,
      isNew: true,
    });
  });

  test('POST /teacher/login should return token and isNew=false for existing user', async () => {
    await request(app)
      .post('/teacher/login')
      .send({ username: 'existinguser', password: 'password123' });

    const response = await request(app)
      .post('/teacher/login')
      .send({ username: 'existinguser', password: 'password123' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      token: expect.any(String),
      isLoggedIn: true,
      isNew: false,
    });
  });

  test('POST /teacher/login should return error for invalid credentials', async () => {
    const response = await request(app)
      .post('/teacher/login')
      .send({ username: 'wronguser', password: 'tick' });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Invalid username or password' });
  });
});

const { registerTeacher } = require('../../../src/services/Teacher.service');
const Teacher = require('../../../src/models/Teacher.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Token_Key } = require('../../../src/config/config');
require('@testing-library/jest-dom');


jest.mock('../../../src/models/Teacher.model');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

const SECRET_KEY = Token_Key.Private_key;

describe('Teacher Service', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should register a new teacher and return token', async () => {
    const username = 'newuser';
    const password = 'password123';

    bcrypt.genSalt.mockResolvedValue('salt');
    bcrypt.hash.mockResolvedValue('hashedPassword');
    Teacher.prototype.save = jest.fn().mockResolvedValue(true);
    jwt.sign.mockReturnValue('token');

    const result = await registerTeacher(username, password);

    expect(Teacher.findOne).not.toHaveBeenCalled();
    expect(Teacher.prototype.save).toHaveBeenCalled();
    expect(result).toEqual({
      token: 'token',
      isLoggedIn: true,
      isNew: true,
    });
  });

  test('should log in existing teacher and return token', async () => {
    const username = 'existinguser';
    const password = 'password123';
    const hashedPassword = 'hashedPassword';

    Teacher.findOne.mockResolvedValue({ username, password: hashedPassword });
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('token');

    const result = await registerTeacher(username, password);

    expect(Teacher.findOne).toHaveBeenCalledWith({ username });
    expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
    expect(result).toEqual({
      token: 'token',
      isLoggedIn: true,
      isNew: false,
    });
  });

  test('should throw error for invalid password', async () => {
    const username = 'existinguser';
    const password = 'wrongpassword';
    const hashedPassword = 'hashedPassword';

    Teacher.findOne.mockResolvedValue({ username, password: hashedPassword });
    bcrypt.compare.mockResolvedValue(false);

    await expect(registerTeacher(username, password)).rejects.toThrow('Invalid username or password');
  });
});

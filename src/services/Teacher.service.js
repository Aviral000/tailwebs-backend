const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Teacher = require('../models/Teacher.model');
const { Token_Key } = require('../config/config');

const SECRET_KEY = Token_Key.Private_key;

const registerTeacher = async (username, password) => {
  try {
    if(password.length < 6) {
      throw new Error("Password should be atleast 6 charactor long")
    }

    let teacher = await Teacher.findOne({ username });

    if (!teacher) {
      const genSalt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, genSalt);

      teacher = new Teacher({
        username,
        password: hashedPassword,
      });
      
      await teacher.save();
      
      return { 
        token: jwt.sign({ username: teacher.username }, SECRET_KEY, { expiresIn: '1h' }),
        isLoggedIn: true,
        isNew: true
      };
    }

    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) {
      throw new Error('Invalid username or password');
    }

    const token = jwt.sign({ username: teacher.username }, SECRET_KEY, { expiresIn: '1h' });

    return { 
      token,
      isLoggedIn: true,
      isNew: false
    };
  } catch (error) {
    throw error;
  }
};

const findTeacherByUsername = async (data) => {
    try {
        const teacher = await Teacher.findOne({ username: data.username });
        return teacher;
    } catch (error) {
        throw error;
    }
}

module.exports = { registerTeacher, findTeacherByUsername };

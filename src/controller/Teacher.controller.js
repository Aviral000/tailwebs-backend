const { registerTeacher } = require('../services/Teacher.service');

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const { token, isLoggedIn, isNew } = await registerTeacher(username, password);
    res.status(200).json({ token, isLoggedIn, isNew });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { login };

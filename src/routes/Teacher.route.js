const { login } = require("../controller/Teacher.controller");

const router = require("express").Router();

router.post("/login", login);

module.exports = router ;
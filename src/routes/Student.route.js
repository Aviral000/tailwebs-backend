const router = require("express").Router();
const { getRequest, addRequest, updateRequest, deleteRequest } = require("../controller/Student.controller");

const passport = require('passport');
const authenticate = passport.authenticate('jwt', { session: false });

router.get("/", authenticate, getRequest);
router.post("/add", authenticate, addRequest);
router.put("/update/:id", authenticate, updateRequest);
router.delete("/delete/:id", authenticate, deleteRequest);

module.exports = router;
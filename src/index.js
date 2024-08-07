const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const passport = require("passport");
const configPassport = require("./config/passport");
const path = require('path');

const { MongoDB, Server } = require('./config/config');
const studentRoute = require("./routes/Student.route");
const teacherRoute = require("./routes/Teacher.route");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../frontend/dist')));

configPassport(passport);

mongoose.connect(MongoDB.url, MongoDB.options)
    .then(() => {
        console.log("DB is connected");
    })
    .catch((err) => {
        console.log("DB discontinued", err);
    })

app.use("/student", studentRoute);
app.use("/teacher", teacherRoute);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist', 'index.html'));
});

app.listen(Server.port, () => {
    console.log(`Server is running on ${Server.port}`)
})
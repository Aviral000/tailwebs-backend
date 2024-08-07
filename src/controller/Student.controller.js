const { getAllStudent, addStudent, updateStudent, deleteStudent } = require("../services/Student.service");

const getRequest = async (req, res) => {
    try {
        const students = await getAllStudent();
        res.status(200).json(students);
    } catch (error) {
        res.status(401).json(error.message);
    }
}

const addRequest = async (req, res) => {
    try {
        const students = await addStudent(req.body);
        res.status(200).json(students);
    } catch (error) {
        res.status(401).json(error.message);
    }
}

const updateRequest = async (req, res) => {
    try {
        const students = await updateStudent(req.body, req.params.id);
        res.status(200).json(students);
    } catch (error) {
        res.status(401).json(error.message);
    }
}

const deleteRequest = async (req, res) => {
    try {
        const students = await deleteStudent(req.params.id);
        res.status(200).json(students);
    } catch (error) {
        res.status(401).json(error.message);
    }
}

module.exports = { getRequest, addRequest, updateRequest, deleteRequest }
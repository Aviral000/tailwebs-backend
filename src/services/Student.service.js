const Student = require("../models/Student.model");

const getAllStudent = async () => {
    try {
        const students = await Student.find({});
        return students;
    } catch (error) {
        throw new Error(error);
    }
}

const addStudent = async (data) => {
    try {
        const { name, subject, marks } = data;
        let student = await Student.findOne({ name, subject });
        if (student) {
            student.marks = marks;
        } else {
            student = new Student({ name, subject, marks });
        }
        await student.save();
        return student;
    } catch (error) {
        throw new Error(error);
    }
}

const updateStudent = async (data, id) => {
    try {
        const student = await Student.findByIdAndUpdate(id, data, { new: true });
        if (!student) {
            throw new Error("Student not found");
        }
        return student;
    } catch (error) {
        throw new Error(error);
    }
}

const deleteStudent = async (id) => {
    try {
        const student = await Student.findByIdAndDelete(id);
        if (!student) {
            throw new Error("Student not found");
        }
        return student;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = { getAllStudent, addStudent, updateStudent, deleteStudent }
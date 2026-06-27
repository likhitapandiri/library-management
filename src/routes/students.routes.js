import express from "express";
import prisma from "../prismaClient.js";

const router = express.Router();

const getStudents = async (req, res) => {
  try {
    const students = await prisma.student.findMany();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const createStudent = async (req,res) =>{
    try {
      const student = await prisma.student.create({
        data: req.body,
      });
      res.status(201).json(student);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
}

const getStudentById = async (req, res) => {

    try {

        const student = await prisma.student.findUnique({
          where: {
            id: Number(req.params.id),
          },
        });

        if (!student) {
          return res.status(404).json({
            message: "student not found",
          });
        }
         res.status(200).json(student);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
}

const updateStudent = async (req,res) =>{
    try {
        const student = await prisma.student.update({
          where: {
            id: Number(req.params.id),
          },
          data: req.body,
        });

        res.status(200).json(student);

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
}

const deleteStudent = async(req,res) =>{
    try {

      const student = await prisma.student.delete({
        where: {
          id: Number(req.params.id),
        },
      });
      if(!student){
        return res.status(404).json({
          message: "student not found",
        });
      }
      res.status(200).json(student);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
}

router.get("/", getStudents);

router.post("/", createStudent);

router.get("/:id", getStudentById);

router.post("/:id", updateStudent);

router.delete("/:id", deleteStudent);

export default router; 
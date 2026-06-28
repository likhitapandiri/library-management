import express from "express";
import prisma from "../prismaClient.js";
import validateRequest from "../../middleware/validator.js";

import {
  CreateStudentSchema,
  UpdateStudentSchema,
  StudentIdSchema,
} from "../validators/student.validator.js";

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

const getStudentByIdReverse = async (req, res) => {
  try {
    const student = await prisma.student.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include:{
        borrowRecords:true,
      }
    });

    //reverse navigation
    // this is why we added borrowRecords BorrowRecord[]

    if (!student) {
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
};

const getStudentByIdNestedReverse = async (req, res) => {
  try {
    const student = await prisma.student.findUnique({
      where: {
        id: 1,
      },

      include: {
        borrowRecords: {
          include: {
            book: true,
          },
        },
      },
    });

    //reverse navigation
    // this is why we added borrowRecords BorrowRecord[]

    if (!student) {
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
};


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

router.post("/", validateRequest(CreateStudentSchema), createStudent);

router.get("/", getStudents);

router.get("/:id", validateRequest(StudentIdSchema, "params"), getStudentById);

router.get(
  "/reverse/:id",
  validateRequest(StudentIdSchema, "params"),
  getStudentByIdReverse,
);

router.get(
  "/reverse/nested/:id",
  validateRequest(StudentIdSchema, "params"),
  getStudentByIdNestedReverse,
);

router.post(
  "/:id",
  validateRequest(StudentIdSchema, "params"),
  validateRequest(UpdateStudentSchema),
  updateStudent,
);

router.delete(
  "/:id",
  validateRequest(StudentIdSchema, "params"),
  deleteStudent,
);

export default router; 
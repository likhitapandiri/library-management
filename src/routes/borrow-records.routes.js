import express from "express";
import prisma from "../prismaClient.js";

const router = express.Router();

const getRecords = async (req, res) => {
  try {
    const records = await prisma.borrowRecord.findMany();
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getRecordById = async (req, res) => {
  try {
    const records = await prisma.borrowRecord.findUnique({
        where:{
            id:Number(req.params.id),
        }
    });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getRecordsInclude = async (req, res) => {
  try {
    //joins - include
   const records =  await prisma.borrowRecord.findUnique({
    where:{
        id:Number(req.params.id),
    },
      include: {
        student: true,
        book: true,
      },
    });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const createRecord = async (req, res) => {
  try {
    const record = await prisma.borrowRecord.create({
      data: {
        ...req.body,
        dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      },
    });
    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateRecord = async (req,res) =>{
        try {
          const record = await prisma.borrowRecord.update({
            where: {
              id: Number(req.params.id),
            },
            data: {
              returnDate: new Date(),
            },
          });

          res.status(200).json(record);
        } catch (error) {
          res.status(500).json({
            message: error.message,
          });
        }
}

router.get("/", getRecords);

router.post("/", createRecord);

router.get("/:id", getRecordById);

router.get("/include/:id", getRecordsInclude);

router.post("/:id", updateRecord);

export default router; 
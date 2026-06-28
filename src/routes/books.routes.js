import express from "express";
import prisma from "../prismaClient.js";
import validateRequest from "../../middleware/validator.js"

import {
  CreateBookSchema,
  UpdateBookSchema,
  BookIdSchema,
} from "../validators/book.validator.js";
const router = express.Router();
const getBooks = async (req, res) => {
  try {
    const books = await prisma.book.findMany();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const createBook = async (req,res) =>{
    try {
      const book = await prisma.book.create({
        data: req.body,
      });
      res.status(201).json(book);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
}

const getBookById = async (req, res) => {

    try {

        const book = await prisma.book.findUnique({
          where: {
            id: Number(req.params.id),
          },
        });

        if(!book){
            return res.status(404).json({
              message: "Book not found",
            });
        }
         res.status(200).json(book);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
}

const updateBook = async (req,res) =>{
    try {
        const book = await prisma.book.update({
          where: {
            id: Number(req.params.id),
          },
          data: req.body,
        });

        res.status(200).json(book);

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
}

const deleteBook = async(req,res) =>{
    try {

      const book = await prisma.book.delete({
        where: {
          id: Number(req.params.id),
        },
      });
      res.status(200).json(book);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
}


router.get("/",getBooks);

router.post("/", validateRequest(CreateBookSchema), createBook);

router.get("/:id", validateRequest(BookIdSchema, "params"), getBookById);

router.post(
  "/:id",
  validateRequest(BookIdSchema, "params"),
  validateRequest(UpdateBookSchema),
  updateBook,
);

router.delete("/:id", validateRequest(BookIdSchema, "params"), deleteBook);

export default router 
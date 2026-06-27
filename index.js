// Import Express using ES Module syntax
import express from "express";
import { PrismaClient } from "@prisma/client";
import booksRoutes from "./src/routes/books.routes.js";
import prisma from "./src/prismaClient.js";

const app = express();
await prisma.$connect();
const PORT = 3000;

app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.send("Hello World using ES Modules!");
});

app.use("/books",booksRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

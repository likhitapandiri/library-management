// Import Express using ES Module syntax
import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();
await prisma.$connect();
const PORT = 3000;

// Basic route
app.get("/", (req, res) => {
  res.send("Hello World using ES Modules!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

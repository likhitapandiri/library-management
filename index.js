// Import Express using ES Module syntax
import express from "express";

const app = express();
const PORT = 3000;

// Basic route
app.get("/", (req, res) => {
  res.send("Hello World using ES Modules!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

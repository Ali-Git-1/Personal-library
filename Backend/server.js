const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const bookRoutes = require("./routes/bookRoutes");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Personal Library API is running!",
  });
});

app.use("/api/books", bookRoutes);

const PORT = process.env.PORT;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server Running On Port => localhost:${PORT}`);
  });
};

startServer();

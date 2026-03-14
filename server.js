const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use("/api/auth", require("./routes/authRoutes"));

app.get("/", (req, res) => {
  res.send("SERVER IS ALIVE");
});

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log("SERVER STARTED ON PORT", PORT);
});

setInterval(() => {}, 1000);

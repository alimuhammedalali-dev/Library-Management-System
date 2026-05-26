require("dotenv").config();
const express = require("express");
const app = express();
const  mongoose  = require("mongoose");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

app.use(express.json());
app.use(require("morgan")("dev"));

app.get("/api/health", (req, res) => res.status(200).json("API is Healthy"));

app.use("/api/v1/users", require("./routes/user.routes"));
app.use("/api/v1/material", require("./routes/material.routes"))
app.use("/api/v1/loans", require("./routes/loans.routes"))
app.use("/api/v1/reservation", require("./routes/reservation.routes"))
app.use("/api/v1/review", require("./routes/review.routes"))

app.use(errorHandler);
app.use(notFound);

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to database successfully");
    app.listen(PORT, () => {
      console.log("Server is running successfully");
    });
  })
  .catch((err) => {
    console.log("Mongodb Error:", err.message);
  });

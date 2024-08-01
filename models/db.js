const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/EggBucket_B2B")
  .then(async () => {
    console.log("Database connected!");
  })
  .catch((err) => console.error("Error connecting to database:", err));

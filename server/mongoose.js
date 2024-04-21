const mongoose = require("mongoose");

const dbName = "test-database";
const connectionString = process.env.MONGO_DB_CONN_STRING + "/" + dbName;

mongoose
  .connect(connectionString)
  .then(() => console.log("MongoDB connected successfully."))
  .catch((error) => console.error("MongoDB connection error:", error));

module.export = mongoose;

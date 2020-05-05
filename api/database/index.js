const mongoose = require("mongoose");
const path = require("path");
const db = mongoose.connection;
const host = process.env.DB_HOST;
const database = process.env.DB_NAME;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const uri = `mongodb+srv://${user}:${password}@${host}/${database}`;
require("dotenv").config({ path: path.join(__dirname, "../config/.env") });

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .catch(console.error);

db.once("open", function () {
  console.log("MongoDB: We are connected!");
});

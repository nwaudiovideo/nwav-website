require("dotenv").config();
const cors = require("cors");
const path = require("path");
const multer = require("multer")();
const express = require("express");
const session = require("express-session");
const router = require("./routes/");
const MongoStore = require("connect-mongo");
const client = require("./config/mongoose.js");

const app = express();

app.set("view engine", "ejs");

app.use(cors());
app.use(multer.array());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
      client: client,
      ttl: 14 * 24 * 60 * 60,
      autoRemove: "interval",
      autoRemoveInterval: 10,
    }),
  })
);

//Set static files
app.use(express.static(path.join(__dirname, "/public/")));

app.use("/", router);

app.listen(process.env.PORT, () => {
  console.log("Listening!");
});

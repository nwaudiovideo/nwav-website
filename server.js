require("dotenv").config();
const cors = require("cors");
const path = require("path");
const multer = require("multer")();
const express = require("express");
const router = require("./routes/");
const passport = require("./config/passport.js");
const session = require("express-session");
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
    cookie: { maxAge: 60 * 60 * 1000 }, //1 Hour(s)
    store: new MongoStore({
      client: client,
      autoRemove: "interval",
      autoRemoveInterval: 10,
    }),
  })
);

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */
app.use(passport.initialize());
app.use(passport.session());

/**
 * -------------------- STATIC FILES ---------------------
 */
app.use(express.static(path.join(__dirname, "/public/")));

/**
 * ---------------------- ROUTER -------------------------
 */
app.use(router);

/**
 * -------------------- START SERVER ---------------------
 */
app.listen(process.env.PORT, () => {
  console.log("Listening!");
});

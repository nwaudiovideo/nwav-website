const path = require("path");
const passport = require("passport");
const router = require("express").Router();

const authorize = require("../middleware/authorization");
const { createUser } = require("../controller/user-controller");

/**************************************************************/
/**                           INDEX                           */
router.get("^/$|/index(.html)?", (req, res, next) => {
  res.render(path.join(__dirname, "..", "views", "index.ejs"));
});
/**************************************************************/

/**************************************************************/
/**                           VIEWS                           */
router.get("/user/signup(.html)?", (req, res, next) => {
  res.render(path.join(__dirname, "..", "views", "signup.ejs"));
});
router.get("/user/signin(.html)?", (req, res, next) => {
  res.render(path.join(__dirname, "..", "views", "signin.ejs"));
});

router.get("/user/", authorize.isAuth, (req, res, next) => {
  res.render(path.join(__dirname, "..", "views", "index.ejs"));
});
/**************************************************************/

/**************************************************************/
/**                           AUTHS                           */

router.post("/auth/signup/", (req, res, next) => {
  createUser(req, res);
});
router.post(
  "/auth/signin/",
  passport.authenticate("local", {
    successRedirect: "/user/",
    failureRedirect: "/user/signin/",
  })
);

/**************************************************************/

module.exports = router;

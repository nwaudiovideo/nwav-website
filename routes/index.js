const path = require("path");
const router = require("express").Router();

const { createUser } = require("../controller/user-controller");

/**************************************************************/
/**                           INDEX                           */
router.get("^/$|/index(.html)?", (req, res, next) => {
  res.render(path.join(__dirname, "..", "views", "index.ejs"));
  next();
});
/**************************************************************/

/**************************************************************/
/**                           VIEWS                           */
router.get("/user/signup(.html)?", (req, res, next) => {
  res.render(path.join(__dirname, "..", "views", "signup.ejs"));
  next();
});
router.get("/user/signin(.html)?", (req, res, next) => {
  res.render(path.join(__dirname, "..", "views", "signin.ejs"));
  next();
});
/**************************************************************/

/**************************************************************/
/**                           AUTHS                           */

router.post("/auth/signup/", (req, res, next) => {
  createUser(req, res);
});
//router.post("/auth/signin/", authorize, (req, res, next) => {});

/**************************************************************/

module.exports = router;

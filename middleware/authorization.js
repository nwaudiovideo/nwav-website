function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    req.session.touch(); //Refresh session
    next();
  } else {
    res.redirect("/user/signin");
  }
}

function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.admin) {
    next(); //We will not refresh session for safty. This will force a new login every hour.
  } else {
    res.status(401).json({
      msg: "You are not authorized to view this resource because you are not an admin.",
    });
  }
}

module.exports = { isAuth, isAdmin };

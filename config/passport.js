const passport = require("passport");
const LocalStratagy = require("passport-local");
const User = require("../model/User.js");

passport.use(new LocalStratagy((email, password, next) => {}));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

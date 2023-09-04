const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../model/User");

passport.use(
  "local",
  new LocalStrategy(function (username, password, done) {
    User.findOne({ email: username })
      .then((user) => {
        if (!user) return done(null, false);
        if (user.matchPassword(password)) return done(null, user);
        else return done(null, false);
      })
      .catch((err) => done(err));
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((user, done) => {
  User.findById(user)
    .then((user) => done(null, user))
    .catch((err) => done(err));
});

module.exports = passport;

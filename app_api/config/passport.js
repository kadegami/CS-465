const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("users"); // Adjust the path as needed
passport.use(
  new LocalStrategy(
    {
      usernameField: "email", // assuming you're using email for login
    },
    async (username, password, done) => {
      const q = await User.findOne({ email: username }).exec();

      if (!q) {
        return done(null, false, { message: "Incorrect Username" });
      }
      if (!q.validPassword(password)) {
        return done(null, false, { message: "Incorrect Password" });
      }
      return done(null, q);
    }
  )
);

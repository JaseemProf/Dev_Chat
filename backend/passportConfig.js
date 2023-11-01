import User from "./user.js";
import bcrypt from "bcryptjs";
import { Strategy as LocalStrategy } from "passport-local";


export default function (passport) {
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });

      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return done(null, false, { message: "Incorrect password." });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findOne({ _id: id });
    const userInformation = {
      username: user.username,
    };
    done(null, userInformation);
  } catch (err) {
    done(err);
  }
});
};

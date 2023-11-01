import Axios from "axios";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import passport from "passport";
import { Strategy as passportLocal } from "passport-local";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";
import session from "express-session";
import bodyParser from "body-parser";
import User from "./user.js";
import "dotenv/config";

const appId = process.env.APP_ID;
const apiToken = process.env.API_TOKEN;
const secret = process.env.SECRET;
const mongoUrl = process.env.MONGODB_URL;
const originUrl = process.env.ORIGIN_URL;
const app = express();
//----------------------------------------- END OF IMPORTS---------------------------------------------------

try {
  await mongoose.connect(mongoUrl);
  console.log("MongoDB Connected");
} catch (error) {
  console.log(error);
}

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: originUrl, // <-- location of the react app were connecting to
    credentials: true,
  })
);
app.use(
  session({
    secret: secret,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser(secret));
app.use(passport.initialize());
app.use(passport.session());
import passportConfig from "./passportConfig.js";
passportConfig(passport);
//----------------------------------------- END OF MIDDLEWARE---------------------------------------------------

// Routes
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      // Handle the error (e.g., log it or send an error response)
      return next(err);
    }
    if (!user) {
      // No user exists; send an appropriate response
      return res.status(401).send("No User Exists");
    }

    // If user exists, log them in using req.login
    req.login(user, (err) => {
      if (err) {
        // Handle the error (e.g., log it or send an error response)
        return next(err);
      }
      // Authentication successful; send a success response
      return res.send("Successfully Authenticated");
    });
  })(req, res, next);
});
app.post("/register", async (req, res) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username });

    if (existingUser) {
      return res.status(400).send("User Already Exists");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
    });

    await newUser.save();
    const userData = {
      user_id: req.body.username,
      nickname: req.body.name,
      profile_url: `https://api.dicebear.com/7.x/micah/png?seed=${req.body.name}`,
    };
    Axios({
      method: "POST",
      data: userData,
      headers: {
        "Api-Token": apiToken,
      },
      url: `https://api-${appId}.sendbird.com/v3/users`,
    }).then((responce) => res.send("User Created"));
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).send("Internal Server Error");
  }
});
app.get("/user", (req, res) => {
  res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});
//----------------------------------------- END OF ROUTES---------------------------------------------------
//Start Server
app.listen(4000, () => {
  console.log("Server Has Started");
});

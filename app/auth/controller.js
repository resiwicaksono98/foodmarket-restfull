/** @format */

const User = require("../user/model");
const bcrypt = require("bcrypt");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../../config/Config.js");

const register = async (req, res, next) => {
   try {
      const payload = req.body;
      let user = new User(payload);
      await user.save();
      return res.json(user);
   } catch (err) {
      if (err && err.name === "ValidationError") {
         return res.status(500).json({
            error: 1,
            message: err.errors.email.message,
            fields: err.errors,
         });
      }
      next(err);
   }
};

const localStrategy = async (email, password, done) => {
   try {
      let user = await User.findOne({ email }).select("-__v -createdAt -updatedAt -cart_items -token");
      if (!user) return done();
      if (bcrypt.compareSync(password, user.password)) {
         ({ password, ...userWithoutPassword } = user.toJSON());
         return done(null, userWithoutPassword);
      }
   } catch (err) {
      done(err, null);
   }

   done();
};

const login = async (req, res, next) => {
   passport.authenticate("local", async function (err, user) {
      if (err) return next(err);
      if (!user) return res.status(500).json({ error: 1, message: "Email or password incorect" });

      let signed = jwt.sign(user, config.secretKey);

      await User.findByIdAndUpdate(user._id, { $push: { token: signed } });
      req.session.token = signed;
      req.session.userId = user._id;
      res.json({
         message: "Login Successfully",
         user,
         token: signed,
      });
   })(req, res, next);
};

const logout = async (req, res, next) => {
   let token = req.session.token;

   let user = await User.findOneAndUpdate({ token: { $in: [token] } }, { $pull: { token: token } }, { useFindAndModify: false });

   if (!token || !user) {
      res.json({
         error: 1,
         message: "User not found",
      });
   }
   return res.json({
      error: 0,
      message: "Logout Berhasil",
   });
};

const me = (req, res, next) => {
   if (!req.user) {
      res.status(500).json({
         err: 1,
         message: "You Are Not Logged in or token expired",
      });
   }

   res.json(req.user);
};

module.exports = { register, login, localStrategy, logout, me };

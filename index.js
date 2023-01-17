/** @format */

const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const express = require("express");
const db = require("./config/Database");

// Routes
const authRoutes = require("./app/auth/router");
const productRoutes = require("./app/product/router");
const tagsRoutes = require("./app/tags/router");
const categoryRoutes = require("./app/category/router");

const app = express();

const store = new MongoDBStore({
   uri: `mongodb+srv://resiwicaksono:thonkwaq123@cluster0.a3dlh.mongodb.net/wakburgerbar?retryWrites=true&w=majority`,
   collection: "session",
});

// Set Session
app.use(
   session({
      name: "kepo",
      secret: "resiwicaksonoxfitriani",
      resave: false,
      saveUninitialized: false,
      store: store,
      cookie: {
         secure: "auto",
         httpOnly: true,
         maxAge: 1000 * 60 * 60 * 24 * 1, // 1 Day
      },
   })
);

app.use(
   cors({
      credentials: true,
      origin: ["http://localhost:5173", "http://localhost:4173"],
   })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", authRoutes);
app.use("/api", productRoutes);
app.use("/api", tagsRoutes);
app.use("/api", categoryRoutes);

db.on("open", function () {
   app.listen(5000, () => console.log("Server is running in port 5000"));
});

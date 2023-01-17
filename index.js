/** @format */

const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const express = require("express");
const app = express();

// const store = new MongoDBStore({
//    uri: "mongodb+srv://resiwicaksono:thonkwaq123@cluster0.a3dlh.mongodb.net/?retryWrites=true&w=majority",
//    collection: "session",
// });

// Set Session
// app.use(
//    session({
//       name: "kepo",
//       secret: "resiwicaksonoxfitriani",
//       resave: false,
//       saveUninitialized: false,
//       store: store,
//       cookie: {
//          secure: "auto",
//          httpOnly: true,
//          maxAge: 1000 * 60 * 60 * 24 * 1, // 1 Day
//       },
//    })
// );
// app.use(
//    cors({
//       credentials: true,
//       origin: ["http://localhost:5173", "http://localhost:4173"],
//    })
// );

app.get("/", (req, res) => {
   res.send("Test Cyclic");
});

app.listen(5000, () => console.log("Server is running in port 5000"));

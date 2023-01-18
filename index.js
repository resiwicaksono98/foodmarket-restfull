/** @format */

const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const cron = require("node-cron");
const express = require("express");
const db = require("./config/Database");

// Routes
const authRoutes = require("./app/auth/router");
const productRoutes = require("./app/product/router");
const tagsRoutes = require("./app/tags/router");
const categoryRoutes = require("./app/category/router");
const cartRoutes = require("./app/cart/router");
const deliveryAddress = require("./app/deliveryAddress/router");
const orderRoutes = require("./app/order/router");
const invoiceRoutes = require("./app/invoice/router");
const paymentRouter = require("./app/payment/router");

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
      origin: ["https://foodmarket-frontend.vercel.app", "http://localhost:5173"],
      optionsSuccessStatus: 200,
   })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Set Schedule sync payment midtrans and database
cron.schedule("*/5 * * * *", () => {
   syncPaymentData();
});

app.use("/auth", authRoutes);
app.use("/api", productRoutes);
app.use("/api", tagsRoutes);
app.use("/api", categoryRoutes);
app.use("/api", cartRoutes);
app.use("/api", deliveryAddress);
app.use("/api", orderRoutes);
app.use("/api", invoiceRoutes);
app.use("/api", paymentRouter);

db.on("open", function () {
   app.listen(5000, () => console.log("Server is running in port 5000"));
});

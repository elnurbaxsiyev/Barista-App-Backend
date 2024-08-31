const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
require("dotenv").config();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.CONNECTION_STRING)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Failed to connect to MongoDB", error.message);
    });

app.listen(8080, () => {
    console.log("Server running on 8080");
});

const UsersRouter = require("./routes/Users.routes");
const AuthRouter = require("./routes/Auth.routes");

app.use("/api/Users", UsersRouter);
app.use("/api/auth", AuthRouter);

const CategoriesRouter = require("./routes/Categories.routes");
app.use("/api/Categories", CategoriesRouter);

const ProductsRouter = require("./routes/Products.routes");
app.use("/api/Products", ProductsRouter);

const OrdersRouter = require("./routes/Orders.routes");
app.use("/api/Orders", OrdersRouter);

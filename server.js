const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB bağlantısı
mongoose.connect(process.env.CONNECTION_STRING)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Failed to connect to MongoDB", error.message);
    });

// Port numarasını doğru şekilde ayarla
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Routerları tanımla
const UsersRouter = require("./routes/Users.routes");
const AuthRouter = require("./routes/Auth.routes");
const CategoriesRouter = require("./routes/Categories.routes");
const ProductsRouter = require("./routes/Products.routes");
const OrdersRouter = require("./routes/Orders.routes");

app.use("/api/Users", UsersRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/Categories", CategoriesRouter);
app.use("/api/Products", ProductsRouter);
app.use("/api/Orders", OrdersRouter);

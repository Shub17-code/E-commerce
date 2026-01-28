const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const dbConnect = require("./config/db");
const userRoutes = require("./routes/UserRoutes");
const ProductRoutes = require("./routes/ProductRoutes");
const CartRoutes = require("./routes/CartRoutes");
const CheckoutRoutes = require("./routes/CheckoutRoute");
const OrderRoutes = require("./routes/OrderRoutes");
const UploadRoutes = require("./routes/UploadRoutes");
const SubscribeRoutes = require("./routes/SubscribeRoutes");
const AdminUserRoutes = require("./routes/Admin/UserRoutes");
const AdminProductRoutes = require("./routes/Admin/ProductRoute");
const AdminOrderRoutes = require("./routes/Admin/OrderRoutes");

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

// mongoDB connection
dbConnect();
const PORT = process.env.PORT || 3000;

app.use("/api/users", userRoutes);
app.use("/api/products", ProductRoutes);
app.use("/api/cart", CartRoutes);
app.use("/api/checkout", CheckoutRoutes);
app.use("/api/orders", OrderRoutes);
app.use("/api/upload", UploadRoutes);
app.use("/api/subscribe", SubscribeRoutes);

// Admin Routes
app.use("/api/admin/users", AdminUserRoutes);
app.use("/api/admin/products", AdminProductRoutes);
app.use("/api/admin/orders", AdminOrderRoutes);

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const products = require("./data/products");
const User = require("./models/User");
const Product = require("./models/Product");
const Cart = require("./models/Cart");

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL);

// Function to seed data
const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Product.deleteMany();
    await Cart.deleteMany();

    // Create a default admin user
    const createdUser = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: bcrypt.hashSync("123456", 10),
      role: "admin",
    });

    // Assign the default admin user Id to each product
    const adminUserId = createdUser._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUserId };
    });

    // Insert products into the database
    await Product.insertMany(sampleProducts);

    console.log("Product Data seeded successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();

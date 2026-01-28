const Product = require("../models/Product");

const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
    } = req.body;

    const product = new Product({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      user: req.user._id, // refrence to admin user who created it
    });

    const createProduct = await product.save();
    res
      .status(201)
      .json(createProduct, { message: "Product created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
    } = req.body;

    // find the product by id
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // update the product
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.discountPrice = discountPrice || product.discountPrice;
    product.countInStock = countInStock || product.countInStock;
    product.sku = sku || product.sku;
    product.category = category || product.category;
    product.brand = brand || product.brand;
    product.sizes = sizes || product.sizes;
    product.colors = colors || product.colors;
    product.collections = collections || product.collections;
    product.material = material || product.material;
    product.gender = gender || product.gender;
    product.images = images || product.images;
    product.isFeatured =
      isFeatured !== undefined ? isFeatured : product.isFeatured;
    product.isPublished =
      isPublished !== undefined ? isPublished : product.isPublished;
    product.tags = tags || product.tags;
    product.dimensions = dimensions || product.dimensions;
    product.weight = weight || product.weight;

    // save the updated product
    const updatedProduct = await product.save();
    res
      .status(200)
      .json(updatedProduct, { message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    await product.deleteOne();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const {
      collection,
      size,
      color,
      gender,
      minPrice,
      maxPrice,
      sortBy,
      search,
      category,
      material,
      brand,
      limit,
    } = req.query;

    let query = {};

    // filter the products logic
    if (collection && collection.toLocaleLowerCase() !== "all")
      query.collections = collection;
    if (category && category.toLocaleLowerCase() !== "all")
      query.category = category;
    if (material) query.material = { $in: material.split(",") };
    if (size) query.sizes = { $in: size.split(",") };
    if (brand) query.brand = { $in: brand.split(",") };
    if (color) query.colors = { $in: [color] };
    if (gender) query.gender = gender;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // sort logic
    let sort = {};
    if (sortBy) {
      switch (sortBy) {
        case "priceAsc":
          sort = { price: 1 };
          break;
        case "priceDesc":
          sort = { price: -1 };
          break;
        case "popularity":
          sort = { rating: -1 };
          break;
        default:
          break;
      }
    }

    const products = await Product.find(query)
      .sort(sort)
      .limit(Number(limit || 0));
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSimilarProducts = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    const similarProducts = await Product.find({
      _id: { $ne: product._id }, // exclude the same product
      gender: product.gender,
      category: product.category,
      // brand: product.brand
    }).limit(4);
    // randomness here
    // const similarProducts = await Product.aggregate([
    //   {
    //     $match: {
    //       _id: { $ne: product._id },
    //       gender: product.gender,
    //       category: product.category,
    //       brand: product.brand,
    //     },
    //   },
    //   { $sample: { size: 4 } }, // randomly pick 4
    // ]);

    res.status(200).json(similarProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductsBestSellers = async (req, res) => {
  try {
    const bestSeller = await Product.findOne().sort({ rating: -1 });
    if (!bestSeller) {
      return res.status(404).json({ error: "No best seller found" });
    }
    res.status(200).json(bestSeller);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductsNewArrivals = async (req, res) => {
  try {
    // fetch last 8 products
    const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(8);
    if (!newArrivals) {
      return res.status(404).json({ error: "No new Arrivals found" });
    }
    res.status(200).json(newArrivals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getSimilarProducts,
  getProductsBestSellers,
  getProductsNewArrivals,
};

const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Helper function to get the cart by userId or guestId
const getCart = async (guestId, userId) => {
  if (userId) {
    const cart = await Cart.findOne({ user: userId });
    return cart;
  } else if (guestId) {
    const cart = await Cart.findOne({ guestId });
    return cart;
  }
  return null;
};
const createCart = async (req, res) => {
  const { productId, quantity, color, size, guestId, userId } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    if (quantity <= 0) {
      return res.status(400).json({ error: "quantity must be greater than 0" });
    }
    // determine if the user is logged in or guest
    let cart = await getCart(guestId, userId);

    // if cart exists update it
    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) =>
          p.productId.toString() === productId &&
          p.color === color &&
          p.size === size
      );
      if (productIndex > -1) {
        // if the product already exists in the cart, update the quantity
        cart.products[productIndex].quantity += quantity;
      } else {
        // if the product doesn't exist in the cart, add it
        cart.products.push({
          productId,
          name: product.name,
          image: product.images[0].url,
          price: product.price,
          color,
          size,
          quantity,
        });
      }

      // Recalculate the total price and save the cart
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      await cart.save();
      return res
        .status(200)
        .json(cart, { message: "Cart updated successfully" });
    } else {
      // if cart doesn't exist, create a new one for the user or guest
      const newCart = await Cart.create({
        user: userId ? userId : undefined,
        guestId: guestId ? guestId : "guest_" + new Date().getTime(),
        products: [
          {
            productId,
            name: product.name,
            image: product.images[0].url,
            price: product.price,
            color,
            size,
            quantity,
          },
        ],
        totalPrice: product.price * quantity,
      });
      return res
        .status(200)
        .json(newCart, { message: "Cart created successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCart = async (req, res) => {
  const { productId, quantity, color, size, guestId, userId } = req.body;
  try {
    let cart = await getCart(guestId, userId);
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.color === color &&
        p.size === size
    );
    if (productIndex > -1) {
      // update the quantity
      if (quantity > 0) {
        cart.products[productIndex].quantity = quantity;
      } else {
        cart.products.splice(productIndex, 1); //remove the product if quantity is 0
      }

      // Recalculate the total price and save the cart
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      await cart.save();
      return res
        .status(200)
        .json(cart, { message: "Cart updated successfully" });
    } else {
      return res.status(404).json({ error: "Product not found in cart" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCart = async (req, res) => {
  const { productId, color, size, guestId, userId } = req.body;
  try {
    let cart = await getCart(guestId, userId);
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.color === color &&
        p.size === size
    );
    if (productIndex > -1) {
      // remove the product
      cart.products.splice(productIndex, 1);
      // Recalculate the total price and save the cart
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      await cart.save();
      return res
        .status(200)
        .json(cart, { message: "Cart updated successfully" });
    } else {
      return res.status(404).json({ error: "Product not found in cart" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCartInfo = async (req, res) => {
  const { guestId, userId } = req.query;
  try {
    const cart = await getCart(guestId, userId);
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    res.status(200).json(cart, { message: "Cart found successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const mergerCarts = async (req, res) => {
  const { guestId } = req.body;
  try {
    const guestCart = await Cart.findOne({ guestId });
    const userCart = await Cart.findOne({ user: req.user._id });

    if (guestCart) {
      if (guestCart.products.length === 0) {
        return res.status(400).json({ error: "Guest Cart is empty" });
      }
      if (userCart) {
        // Merge guest cart into user cart
        guestCart.products.forEach((guestItem) => {
          const productIndex = userCart.products.findIndex(
            (item) =>
              item.productId.toString() === guestItem.productId.toString() &&
              item.size === guestItem.size &&
              item.color === guestItem.color
          );
          if (productIndex > -1) {
            // if the item exists in the user cart, update the quantity
            userCart.products[productIndex].quantity += guestItem.quantity;
          } else {
            // add guest item to cart
            userCart.products.push(guestItem);
          }
        });
        userCart.totalPrice = userCart.products.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        await userCart.save();

        // remove the guest cart after merging
        try {
          await Cart.findOneAndDelete({ guestId });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
        return res.status(200).json(userCart, {
          message: "Carts merged successfully",
        });
      } else {
        // if the user has no existing cart, just assign guest Cart to the user
        guestCart.user = req.user._id;
        guestCart.guestId = undefined; // remove guestId
        await guestCart.save();

        return res.status(200).json(guestCart, {
          message: "Guest cart assigned to user",
        });
      }
    } else {
      if (userCart) {
        return res.status(200).json(userCart, {
          message: "Guest cart already assigned to user",
        });
      }
      return res.status(404).json({ error: "Guest cart not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCart,
  updateCart,
  deleteCart,
  getCartInfo,
  mergerCarts,
};

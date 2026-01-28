const Checkout = require("../models/Checkout");
const Order = require("../models/Order");
const Cart = require("../models/Cart");

const createCheckout = async (req, res) => {
  const { checkoutItems, shippingAddress, paymentMethod, totalPrice } =
    req.body;

  if (!checkoutItems || checkoutItems.length === 0) {
    return res.status(400).json({ error: "No items in checkout" });
  }

  try {
    const checkout = await Checkout.create({
      user: req.user._id,
      checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: "Pending",
      isPaid: false,
    });
    res
      .status(201)
      .json(checkout, { message: "Checkout created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCheckout = async (req, res) => {
  const { paymentStatus, paymentDetails } = req.body;
  try {
    const checkout = await Checkout.findById(req.params.id);
    if (!checkout) {
      return res.status(404).json({ error: "Checkout not found" });
    }

    if (paymentStatus === "Paid") {
      checkout.isPaid = true;
      checkout.paymentStatus = paymentStatus;
      checkout.paymentDetails = paymentDetails;
      checkout.paidAt = Date.now();

      await checkout.save();
      return res
        .status(200)
        .json(checkout, { message: "Checkout updated successfully" });
    } else {
      return res.status(400).json({ error: "Payment not successful" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const confirmedCheckout = async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params.id);
    if (!checkout) {
      return res.status(404).json({ error: "Checkout not found" });
    }
    if (checkout.isPaid && !checkout.isFinalized) {
      // create final order based on checkout details
      const finalOrder = await Order.create({
        user: checkout.user,
        orderItems: checkout.checkoutItems,
        shippingAddress: checkout.shippingAddress,
        paymentMethod: checkout.paymentMethod,
        totalPrice: checkout.totalPrice,
        isPaid: true,
        paidAt: checkout.paidAt,
        isDelivered: false,
        paymentStatus: "Paid",
        paymentDetails: checkout.paymentDetails,
      });

      // mark checkout as finalized
      checkout.isFinalized = true;
      checkout.finalizedAt = Date.now();
      await checkout.save();

      // delete the cart associated with the user
      await Cart.findOneAndDelete({ user: checkout.user });
      return res
        .status(200)
        .json(finalOrder, { message: "Checkout finalized successfully" });
    } else if (checkout.isFinalized) {
      return res.status(400).json({ error: "Checkout already finalized" });
    } else {
      return res.status(400).json({ error: "Checkout is not paid" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createCheckout, updateCheckout, confirmedCheckout };

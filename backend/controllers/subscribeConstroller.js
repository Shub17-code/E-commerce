const Subscribe = require("../models/Subscribe");

const createSubscribe = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  try {
    // check if email already subscribed
    const subscribe = await Subscribe.findOne({ email });

    if (subscribe) {
      return res.status(400).json({ error: "Email already subscribed" });
    }

    // create new subscribe
    let newSubscribe = new Subscribe({ email });
    newSubscribe = await newSubscribe.save();
    res.status(201).json(newSubscribe, {
      message: "Successfully subscribed to newsletter!",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createSubscribe };

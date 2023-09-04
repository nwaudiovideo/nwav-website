const User = require("../model/User");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  if (!req?.body?.email) {
    return res
      .status(400)
      .json({ message: "Email is required to create account!" });
  }
  if (await User.findOne({ email: req.body.email }).exec()) {
    res.status(409).json({ message: "Email is in use!" });
  } else {
    try {
      //const salt = bcrypt.genSalt(10);
      const hspswd = await bcrypt.hash(req.body.password, 10);
      const result = await User.create({
        email: req.body.email,
        password: hspswd,
      });
      res.status(201);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

module.exports = { createUser };

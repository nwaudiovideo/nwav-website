const User = require("../model/User");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  if (!req?.body?.email) {
    return res
      .status(400)
      .json({ message: "Email is required to create account!" });
  }

  let hspswd = "";

  if (req?.body?.password) hspswd = await bcrypt.hash(req.body.password, 10);

  await User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        res.status(409).json({ message: "Email is in use!" });
      } else {
        const result = User.create({
          email: req.body.email,
          password: hspswd,
        });
        res.status(201);
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

module.exports = { createUser };

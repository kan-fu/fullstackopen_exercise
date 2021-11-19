const bcrypt = require("bcrypt");
const user = require("../models/user");
const userRouter = require("express").Router();
const User = require("../models/user");

userRouter.post("/", async (req, res) => {
  const body = req.body;

  // Both username and password must be given and at leaset 3 characters long
  if (!body.username || !body.password) {
    return res
      .status(401)
      .json({ error: "both username and password must be given!" });
  }

  if (body.username.length < 3 || body.password.length < 3) {
    return res.status(401).json({
      error: "username and password must be at least 3 characters long",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name || "",
    passwordHash,
  });

  const savedUser = await user.save();

  res.json(savedUser);
});

userRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs", { user: 0 });
  res.json(users.map((u) => u.toJSON()));
});

module.exports = userRouter;

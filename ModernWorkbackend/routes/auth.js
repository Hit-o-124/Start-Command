import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.json({ msg: "User already exists" });

  const user = new User({ email, password });
  await user.save();

  res.json({ msg: "Registered", user });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });
  if (!user) return res.json({ msg: "Wrong credentials" });

  res.json({ msg: "Logged in", user });
});

export default router;

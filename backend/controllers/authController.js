const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// REGISTER USER
exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ msg: 'User already exists' });

    // Password is hashed automatically by the "pre-save" hook in User.js
    const user = new User({ username, email, password });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: { username: user.username, email: user.email } });
  } catch (err) {
    res.status(500).json({ msg: 'Server error during registration' });
  }
};

// LOGIN USER
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { username: user.username, email: user.email } });
  } catch (err) {
    res.status(500).json({ msg: 'Server error during login' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { username, password } = req.body;
    const updates = { username };

    // Only hash and update password if the user actually provided a new one
    if (password && password.trim() !== '') {
      updates.password = await bcrypt.hash(password, 10);
    }

    // Find user by ID (from the JWT token) and update
    // { new: true } returns the updated user instead of the old one
    const user = await User.findByIdAndUpdate(
      req.user.id, 
      { $set: updates }, 
      { new: true }
    ).select('-password'); // Exclude password from the response

    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
};
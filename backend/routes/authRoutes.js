const express = require('express');
const router = express.Router();
const { register, login, updateProfile } = require('../controllers/authController'); // Import the new function
const auth = require('../middleware/authMiddleware'); // Protect the route!

router.post('/register', register);
router.post('/login', login);
router.put('/profile', auth, updateProfile); // New protected route

module.exports = router;
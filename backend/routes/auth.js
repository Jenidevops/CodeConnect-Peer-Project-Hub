const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

// @desc    Verify Firebase token
// @route   POST /api/auth/verify
// @access  Private
router.post('/verify', authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user,
    message: 'Token verified successfully'
  });
});

// @desc    Get current user info
// @route   GET /api/auth/me
// @access  Private
router.get('/me', authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user
  });
});

module.exports = router;

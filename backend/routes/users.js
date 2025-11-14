const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {
  getUserProfile,
  updateUserProfile,
  getUserProjects,
  getStats
} = require('../controllers/userController');

// Public routes
router.get('/stats', getStats);
router.get('/:userId', getUserProfile);
router.get('/:userId/projects', getUserProjects);

// Private routes
router.put('/profile', authMiddleware, updateUserProfile);

module.exports = router;

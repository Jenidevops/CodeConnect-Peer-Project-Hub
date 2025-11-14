const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {
  getBookmarks,
  toggleBookmark,
  checkBookmark
} = require('../controllers/bookmarkController');

// All bookmark routes require authentication
router.use(authMiddleware);

router.get('/', getBookmarks);
router.post('/:projectId', toggleBookmark);
router.get('/check/:projectId', checkBookmark);

module.exports = router;

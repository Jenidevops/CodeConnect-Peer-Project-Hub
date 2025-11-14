const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authMiddleware = require('../middleware/auth');
const validate = require('../middleware/validate');
const {
  getComments,
  createComment,
  deleteComment,
  toggleCommentLike
} = require('../controllers/commentController');

// Validation rules
const commentValidation = [
  body('content')
    .trim()
    .notEmpty().withMessage('Comment content is required')
    .isLength({ max: 1000 }).withMessage('Comment cannot exceed 1000 characters')
];

// Public routes
router.get('/:projectId', getComments);

// Protected routes
router.post('/:projectId', authMiddleware, commentValidation, validate, createComment);
router.delete('/:id', authMiddleware, deleteComment);
router.post('/:id/like', authMiddleware, toggleCommentLike);

module.exports = router;

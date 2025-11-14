const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authMiddleware = require('../middleware/auth');
const validate = require('../middleware/validate');
const {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  toggleLike
} = require('../controllers/projectController');
const {
  rateProject,
  getUserRating,
  getProjectRatings,
  deleteRating
} = require('../controllers/ratingController');

// Validation rules
const projectValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 100 }).withMessage('Title cannot exceed 100 characters'),
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .isLength({ max: 2000 }).withMessage('Description cannot exceed 2000 characters'),
  body('tags')
    .optional()
    .isArray().withMessage('Tags must be an array'),
  body('githubRepo')
    .optional()
    .matches(/^https?:\/\/(www\.)?github\.com\/.+/).withMessage('Invalid GitHub URL'),
  body('liveDemo')
    .optional()
    .matches(/^https?:\/\/.+/).withMessage('Invalid URL for live demo')
];

// Public routes
router.get('/', getAllProjects);
router.get('/:id', getProjectById);

// Protected routes
router.post('/', authMiddleware, projectValidation, validate, createProject);
router.put('/:id', authMiddleware, projectValidation, validate, updateProject);
router.delete('/:id', authMiddleware, deleteProject);
router.post('/:id/like', authMiddleware, toggleLike);

// Rating routes
router.post('/:projectId/rate', authMiddleware, rateProject);
router.get('/:projectId/rating/user', authMiddleware, getUserRating);
router.get('/:projectId/ratings', getProjectRatings);
router.delete('/:projectId/rating', authMiddleware, deleteRating);

module.exports = router;

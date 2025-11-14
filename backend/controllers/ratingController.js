const Rating = require('../models/Rating');
const Project = require('../models/Project');

// @desc    Rate a project
// @route   POST /api/projects/:projectId/rate
// @access  Private
exports.rateProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { rating } = req.body;

    // Validate rating value
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      });
    }

    // Check if project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Check if user is trying to rate their own project
    if (project.authorId === req.user.uid) {
      return res.status(403).json({
        success: false,
        message: 'You cannot rate your own project'
      });
    }

    // Create or update rating
    const existingRating = await Rating.findOne({
      userId: req.user.uid,
      projectId
    });

    let ratingDoc;
    if (existingRating) {
      existingRating.rating = rating;
      ratingDoc = await existingRating.save();
    } else {
      ratingDoc = await Rating.create({
        userId: req.user.uid,
        projectId,
        rating
      });
    }

    // Recalculate average rating
    await recalculateProjectRating(projectId);

    res.status(200).json({
      success: true,
      data: ratingDoc,
      message: existingRating ? 'Rating updated' : 'Rating added'
    });
  } catch (error) {
    console.error('Rate project error:', error);
    res.status(500).json({
      success: false,
      message: 'Error rating project',
      error: error.message
    });
  }
};

// @desc    Get user's rating for a project
// @route   GET /api/projects/:projectId/rating/user
// @access  Private
exports.getUserRating = async (req, res) => {
  try {
    const { projectId } = req.params;

    const rating = await Rating.findOne({
      userId: req.user.uid,
      projectId
    });

    res.status(200).json({
      success: true,
      data: rating ? { rating: rating.rating } : null
    });
  } catch (error) {
    console.error('Get user rating error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching rating',
      error: error.message
    });
  }
};

// @desc    Get all ratings for a project
// @route   GET /api/projects/:projectId/ratings
// @access  Public
exports.getProjectRatings = async (req, res) => {
  try {
    const { projectId } = req.params;

    const ratings = await Rating.find({ projectId })
      .sort({ createdAt: -1 })
      .limit(100);

    // Calculate rating distribution
    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    ratings.forEach(r => {
      distribution[r.rating]++;
    });

    const project = await Project.findById(projectId);

    res.status(200).json({
      success: true,
      data: {
        average: project?.rating?.average || 0,
        count: project?.rating?.count || 0,
        distribution
      }
    });
  } catch (error) {
    console.error('Get project ratings error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching ratings',
      error: error.message
    });
  }
};

// @desc    Delete user's rating
// @route   DELETE /api/projects/:projectId/rating
// @access  Private
exports.deleteRating = async (req, res) => {
  try {
    const { projectId } = req.params;

    const rating = await Rating.findOne({
      userId: req.user.uid,
      projectId
    });

    if (!rating) {
      return res.status(404).json({
        success: false,
        message: 'Rating not found'
      });
    }

    await rating.deleteOne();

    // Recalculate average rating
    await recalculateProjectRating(projectId);

    res.status(200).json({
      success: true,
      message: 'Rating deleted'
    });
  } catch (error) {
    console.error('Delete rating error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting rating',
      error: error.message
    });
  }
};

// Helper function to recalculate project rating
async function recalculateProjectRating(projectId) {
  const ratings = await Rating.find({ projectId });
  
  if (ratings.length === 0) {
    await Project.findByIdAndUpdate(projectId, {
      'rating.average': 0,
      'rating.count': 0
    });
    return;
  }

  const sum = ratings.reduce((acc, r) => acc + r.rating, 0);
  const average = sum / ratings.length;

  await Project.findByIdAndUpdate(projectId, {
    'rating.average': Math.round(average * 10) / 10, // Round to 1 decimal
    'rating.count': ratings.length
  });
}

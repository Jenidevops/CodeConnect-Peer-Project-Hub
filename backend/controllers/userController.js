const Project = require('../models/Project');
const User = require('../models/User');

// @desc    Get user profile
// @route   GET /api/users/:userId
// @access  Public
exports.getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findOne({ uid: userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get user's project count
    const projectCount = await Project.countDocuments({ authorId: userId });

    res.status(200).json({
      success: true,
      data: {
        ...user.toObject(),
        projectCount
      }
    });
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user profile',
      error: error.message
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateUserProfile = async (req, res) => {
  try {
    const { uid } = req.user;
    const updates = req.body;

    // Fields that can be updated
    const allowedUpdates = ['displayName', 'bio', 'location', 'website', 'github', 'twitter', 'linkedin', 'skills', 'photoURL'];
    const filteredUpdates = {};

    Object.keys(updates).forEach(key => {
      if (allowedUpdates.includes(key)) {
        filteredUpdates[key] = updates[key];
      }
    });

    const user = await User.findOneAndUpdate(
      { uid },
      { $set: filteredUpdates },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user,
      message: 'Profile updated successfully'
    });
  } catch (error) {
    console.error('Update user profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating user profile',
      error: error.message
    });
  }
};

// @desc    Get user profile with their projects
// @route   GET /api/users/:userId/projects
// @access  Public
exports.getUserProjects = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 12 } = req.query;

    const projects = await Project.find({ authorId: userId })
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Project.countDocuments({ authorId: userId });

    res.status(200).json({
      success: true,
      data: projects,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(count / limit),
        totalProjects: count,
        hasMore: page * limit < count
      }
    });
  } catch (error) {
    console.error('Get user projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user projects',
      error: error.message
    });
  }
};

// @desc    Get platform statistics
// @route   GET /api/users/stats
// @access  Public
exports.getStats = async (req, res) => {
  try {
    const totalProjects = await Project.countDocuments();
    
    // Get unique users count
    const uniqueAuthors = await Project.distinct('authorId');
    const totalUsers = uniqueAuthors.length;

    // Get top 5 most liked projects (for carousel)
    const mostLikedProjects = await Project.find()
      .sort({ likesCount: -1, createdAt: -1 })
      .limit(5);

    // Get top 5 highest rated projects (for carousel)
    const highestRatedProjects = await Project.find({ 'rating.count': { $gt: 0 } })
      .sort({ 'rating.average': -1, 'rating.count': -1, createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      data: {
        totalProjects,
        totalUsers,
        mostLikedProjects,
        highestRatedProjects
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error.message
    });
  }
};

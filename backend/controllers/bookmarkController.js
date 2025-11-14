const Bookmark = require('../models/Bookmark');
const Project = require('../models/Project');

// @desc    Get user's bookmarks
// @route   GET /api/bookmarks
// @access  Private
exports.getBookmarks = async (req, res) => {
  try {
    const { page = 1, limit = 12 } = req.query;

    const bookmarks = await Bookmark.find({ userId: req.user.uid })
      .populate('projectId')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Bookmark.countDocuments({ userId: req.user.uid });

    // Filter out any bookmarks where project was deleted
    const validBookmarks = bookmarks.filter(b => b.projectId !== null);

    res.status(200).json({
      success: true,
      data: validBookmarks.map(b => b.projectId),
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(count / limit),
        totalBookmarks: count,
        hasMore: page * limit < count
      }
    });
  } catch (error) {
    console.error('Get bookmarks error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching bookmarks',
      error: error.message
    });
  }
};

// @desc    Toggle bookmark
// @route   POST /api/bookmarks/:projectId
// @access  Private
exports.toggleBookmark = async (req, res) => {
  try {
    const { projectId } = req.params;

    // Check if project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    const existingBookmark = await Bookmark.findOne({
      userId: req.user.uid,
      projectId
    });

    let bookmarked = false;

    if (existingBookmark) {
      // Remove bookmark
      await existingBookmark.deleteOne();
    } else {
      // Add bookmark
      await Bookmark.create({
        userId: req.user.uid,
        projectId
      });
      bookmarked = true;
    }

    res.status(200).json({
      success: true,
      data: {
        bookmarked
      }
    });
  } catch (error) {
    console.error('Toggle bookmark error:', error);
    res.status(500).json({
      success: false,
      message: 'Error toggling bookmark',
      error: error.message
    });
  }
};

// @desc    Check if project is bookmarked
// @route   GET /api/bookmarks/check/:projectId
// @access  Private
exports.checkBookmark = async (req, res) => {
  try {
    const bookmark = await Bookmark.findOne({
      userId: req.user.uid,
      projectId: req.params.projectId
    });

    res.status(200).json({
      success: true,
      data: {
        bookmarked: !!bookmark
      }
    });
  } catch (error) {
    console.error('Check bookmark error:', error);
    res.status(500).json({
      success: false,
      message: 'Error checking bookmark',
      error: error.message
    });
  }
};

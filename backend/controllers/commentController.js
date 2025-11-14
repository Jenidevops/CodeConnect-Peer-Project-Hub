const Comment = require('../models/Comment');
const Project = require('../models/Project');

// @desc    Get comments for a project
// @route   GET /api/comments/:projectId
// @access  Public
exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ projectId: req.params.projectId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: comments,
      count: comments.length
    });
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching comments',
      error: error.message
    });
  }
};

// @desc    Create new comment
// @route   POST /api/comments/:projectId
// @access  Private
exports.createComment = async (req, res) => {
  try {
    const { content } = req.body;
    const { projectId } = req.params;

    // Check if project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    const comment = await Comment.create({
      projectId,
      content,
      authorId: req.user.uid,
      authorName: req.user.name,
      authorEmail: req.user.email,
      authorPhoto: req.user.picture
    });

    // Update project comment count
    project.commentsCount += 1;
    await project.save();

    res.status(201).json({
      success: true,
      data: comment,
      message: 'Comment added successfully'
    });
  } catch (error) {
    console.error('Create comment error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating comment',
      error: error.message
    });
  }
};

// @desc    Delete comment
// @route   DELETE /api/comments/:id
// @access  Private
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      });
    }

    // Check ownership
    if (comment.authorId !== req.user.uid) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this comment'
      });
    }

    const projectId = comment.projectId;
    await comment.deleteOne();

    // Update project comment count
    const project = await Project.findById(projectId);
    if (project) {
      project.commentsCount = Math.max(0, project.commentsCount - 1);
      await project.save();
    }

    res.status(200).json({
      success: true,
      message: 'Comment deleted successfully'
    });
  } catch (error) {
    console.error('Delete comment error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting comment',
      error: error.message
    });
  }
};

// @desc    Toggle like on comment
// @route   POST /api/comments/:id/like
// @access  Private
exports.toggleCommentLike = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      });
    }

    const userIndex = comment.likes.indexOf(req.user.uid);
    let liked = false;

    if (userIndex > -1) {
      comment.likes.splice(userIndex, 1);
      comment.likesCount = Math.max(0, comment.likesCount - 1);
    } else {
      comment.likes.push(req.user.uid);
      comment.likesCount += 1;
      liked = true;
    }

    await comment.save();

    res.status(200).json({
      success: true,
      data: {
        liked,
        likesCount: comment.likesCount
      }
    });
  } catch (error) {
    console.error('Toggle comment like error:', error);
    res.status(500).json({
      success: false,
      message: 'Error toggling comment like',
      error: error.message
    });
  }
};

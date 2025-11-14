const Project = require('../models/Project');
const Comment = require('../models/Comment');
const Bookmark = require('../models/Bookmark');
const Rating = require('../models/Rating');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
exports.getAllProjects = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 12, 
      search = '', 
      tags = '', 
      sortBy = 'recent' 
    } = req.query;

    const query = {};

    // Search filter
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Tags filter
    if (tags) {
      const tagArray = tags.split(',').map(tag => tag.trim());
      query.tags = { $in: tagArray };
    }

    // Sort options
    let sort = {};
    switch (sortBy) {
      case 'popular':
        sort = { likesCount: -1 };
        break;
      case 'rated':
        sort = { 'rating.average': -1 };
        break;
      case 'recent':
      default:
        sort = { createdAt: -1 };
    }

    const projects = await Project.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    const count = await Project.countDocuments(query);

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
    console.error('Get all projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching projects',
      error: error.message
    });
  }
};

// @desc    Get single project by ID
// @route   GET /api/projects/:id
// @access  Public
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Increment view count
    project.viewsCount += 1;
    await project.save();

    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching project',
      error: error.message
    });
  }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Private
exports.createProject = async (req, res) => {
  try {
    const { title, displayName, description, tags, githubRepo, liveDemo, thumbnail } = req.body;

    const project = await Project.create({
      title,
      displayName,
      description,
      tags: tags || [],
      githubRepo,
      liveDemo,
      thumbnail,
      authorId: req.user.uid,
      authorName: req.user.name,
      authorEmail: req.user.email,
      authorPhoto: req.user.picture
    });

    res.status(201).json({
      success: true,
      data: project,
      message: 'Project created successfully'
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating project',
      error: error.message
    });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Check ownership or admin status
    if (project.authorId !== req.user.uid && !req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this project'
      });
    }

    const { title, displayName, description, tags, githubRepo, liveDemo, thumbnail } = req.body;

    project.title = title || project.title;
    project.displayName = displayName !== undefined ? displayName : project.displayName;
    project.description = description || project.description;
    project.tags = tags || project.tags;
    project.githubRepo = githubRepo !== undefined ? githubRepo : project.githubRepo;
    project.liveDemo = liveDemo !== undefined ? liveDemo : project.liveDemo;
    project.thumbnail = thumbnail !== undefined ? thumbnail : project.thumbnail;

    await project.save();

    res.status(200).json({
      success: true,
      data: project,
      message: 'Project updated successfully'
    });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating project',
      error: error.message
    });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Check ownership or admin status
    if (project.authorId !== req.user.uid && !req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this project'
      });
    }

    // Delete associated comments and bookmarks
    await Comment.deleteMany({ projectId: req.params.id });
    await Bookmark.deleteMany({ projectId: req.params.id });
    await Rating.deleteMany({ projectId: req.params.id });

    await project.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting project',
      error: error.message
    });
  }
};

// @desc    Toggle like on project
// @route   POST /api/projects/:id/like
// @access  Private
exports.toggleLike = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    const userIndex = project.likes.indexOf(req.user.uid);
    let liked = false;

    if (userIndex > -1) {
      // Unlike
      project.likes.splice(userIndex, 1);
      project.likesCount = Math.max(0, project.likesCount - 1);
    } else {
      // Like
      project.likes.push(req.user.uid);
      project.likesCount += 1;
      liked = true;
    }

    await project.save();

    res.status(200).json({
      success: true,
      data: {
        liked,
        likesCount: project.likesCount
      }
    });
  } catch (error) {
    console.error('Toggle like error:', error);
    res.status(500).json({
      success: false,
      message: 'Error toggling like',
      error: error.message
    });
  }
};

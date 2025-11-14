const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  displayName: {
    type: String,
    trim: true,
    maxlength: [15, 'Display name cannot exceed 15 characters'],
    default: ''
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  tags: [{
    type: String,
    trim: true
  }],
  githubRepo: {
    type: String,
    trim: true,
    match: [/^https?:\/\/(www\.)?github\.com\/.+/, 'Please provide a valid GitHub URL']
  },
  liveDemo: {
    type: String,
    trim: true,
    match: [/^https?:\/\/.+/, 'Please provide a valid URL']
  },
  thumbnail: {
    type: String,
    default: ''
  },
  authorId: {
    type: String,
    required: true,
    index: true
  },
  authorName: {
    type: String,
    required: true
  },
  authorEmail: {
    type: String,
    required: true
  },
  authorPhoto: {
    type: String,
    default: ''
  },
  likes: [{
    type: String // Firebase UID
  }],
  likesCount: {
    type: Number,
    default: 0
  },
  viewsCount: {
    type: Number,
    default: 0
  },
  commentsCount: {
    type: Number,
    default: 0
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

// Indexes for better query performance
ProjectSchema.index({ createdAt: -1 });
ProjectSchema.index({ likesCount: -1 });
ProjectSchema.index({ 'rating.average': -1 });
ProjectSchema.index({ tags: 1 });
ProjectSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Project', ProjectSchema);

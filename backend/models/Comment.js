const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
    index: true
  },
  authorId: {
    type: String,
    required: true
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
  content: {
    type: String,
    required: [true, 'Comment content is required'],
    maxlength: [1000, 'Comment cannot exceed 1000 characters']
  },
  likes: [{
    type: String // Firebase UID
  }],
  likesCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for efficient queries
CommentSchema.index({ projectId: 1, createdAt: -1 });

module.exports = mongoose.model('Comment', CommentSchema);

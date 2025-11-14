const mongoose = require('mongoose');

const BookmarkSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  }
}, {
  timestamps: true
});

// Compound index to prevent duplicate bookmarks
BookmarkSchema.index({ userId: 1, projectId: 1 }, { unique: true });

module.exports = mongoose.model('Bookmark', BookmarkSchema);

const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
    index: true
  },
  userId: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  }
}, {
  timestamps: true
});

// Compound index to allow one rating per user per project
RatingSchema.index({ userId: 1, projectId: 1 }, { unique: true });

module.exports = mongoose.model('Rating', RatingSchema);

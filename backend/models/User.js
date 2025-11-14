const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  displayName: {
    type: String,
    required: true,
    trim: true
  },
  photoURL: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    default: '',
    maxlength: 500
  },
  location: {
    type: String,
    default: '',
    maxlength: 100
  },
  website: {
    type: String,
    default: '',
    maxlength: 200
  },
  github: {
    type: String,
    default: '',
    maxlength: 100
  },
  twitter: {
    type: String,
    default: '',
    maxlength: 100
  },
  linkedin: {
    type: String,
    default: '',
    maxlength: 100
  },
  skills: [{
    type: String,
    trim: true
  }],
  provider: {
    type: String,
    enum: ['email', 'google', 'github'],
    default: 'email'
  },
  isAdmin: {
    type: Boolean,
    default: false,
    index: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for better query performance
userSchema.index({ displayName: 'text', bio: 'text' });
userSchema.index({ createdAt: -1 });

module.exports = mongoose.model('User', userSchema);

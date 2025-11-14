const { admin } = require('../config/firebase');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided. Authorization denied.'
      });
    }

    const token = authHeader.split(' ')[1];

    try {
      // Verify Firebase token
      const decodedToken = await admin.auth().verifyIdToken(token);
      
      // Get Firebase user details for provider info
      const firebaseUser = await admin.auth().getUser(decodedToken.uid);
      
      // Determine provider
      let provider = 'email';
      if (firebaseUser.providerData && firebaseUser.providerData.length > 0) {
        const providerId = firebaseUser.providerData[0].providerId;
        if (providerId === 'google.com') provider = 'google';
        else if (providerId === 'github.com') provider = 'github';
      }
      
      // Create or update user in MongoDB
      const userData = {
        uid: decodedToken.uid,
        email: decodedToken.email,
        displayName: decodedToken.name || firebaseUser.displayName || decodedToken.email?.split('@')[0],
        photoURL: decodedToken.picture || firebaseUser.photoURL || '',
        provider: provider,
        lastLogin: new Date()
      };

      // Auto-assign admin role for configured admin email
      const adminEmail = process.env.ADMIN_EMAIL || 'jenidevops@gmail.com';
      if (decodedToken.email === adminEmail) {
        userData.isAdmin = true;
      }

      // Use findOneAndUpdate with upsert to create or update
      const user = await User.findOneAndUpdate(
        { uid: decodedToken.uid },
        { $set: userData },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      
      // Attach user info to request
      req.user = {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        picture: user.photoURL,
        provider: user.provider,
        isAdmin: user.isAdmin || false
      };

      next();
    } catch (error) {
      console.error('Token verification error:', error.message);
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token.'
      });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during authentication.'
    });
  }
};

module.exports = authMiddleware;

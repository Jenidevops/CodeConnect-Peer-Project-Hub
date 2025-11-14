import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiSave } from 'react-icons/fi';
import Button from './Button';
import Input from './Input';
import Textarea from './Textarea';
import { usersAPI } from '../../services/api';
import toast from 'react-hot-toast';

const EditProfileModal = ({ isOpen, onClose, userProfile, onUpdate }) => {
  const [formData, setFormData] = useState({
    displayName: userProfile?.displayName || '',
    bio: userProfile?.bio || '',
    location: userProfile?.location || '',
    website: userProfile?.website || '',
    github: userProfile?.github || '',
    linkedin: userProfile?.linkedin || '',
    skills: userProfile?.skills?.join(', ') || ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Convert skills string to array
      const skillsArray = formData.skills
        .split(',')
        .map(skill => skill.trim())
        .filter(skill => skill);

      const updateData = {
        ...formData,
        skills: skillsArray
      };

      await usersAPI.updateProfile(updateData);
      toast.success('Profile updated successfully!');
      onUpdate(); // Refresh profile data
      onClose();
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="card p-8 w-full max-w-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold gradient-text">
                    Edit Profile
                  </h2>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
                  >
                    <FiX className="text-xl" />
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Display Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-dark-200 mb-2">
                      Display Name
                    </label>
                    <Input
                      type="text"
                      name="displayName"
                      value={formData.displayName}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                    />
                  </div>

                  {/* Bio */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-dark-200 mb-2">
                      Bio
                    </label>
                    <Textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      placeholder="Tell us about yourself..."
                      rows={4}
                      maxLength={500}
                    />
                    <p className="text-xs text-gray-500 dark:text-dark-400 mt-1">
                      {formData.bio.length}/500 characters
                    </p>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-dark-200 mb-2">
                      Location
                    </label>
                    <Input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="City, Country"
                      maxLength={100}
                    />
                  </div>

                  {/* Website */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-dark-200 mb-2">
                      Website
                    </label>
                    <Input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://yourwebsite.com"
                      maxLength={200}
                    />
                  </div>

                  {/* Social Links */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* GitHub */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-dark-200 mb-2">
                        GitHub
                      </label>
                      <Input
                        type="text"
                        name="github"
                        value={formData.github}
                        onChange={handleChange}
                        placeholder="username or full URL"
                        maxLength={100}
                      />
                    </div>

                    {/* LinkedIn */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-dark-200 mb-2">
                        LinkedIn
                      </label>
                      <Input
                        type="text"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleChange}
                        placeholder="username or full URL"
                        maxLength={100}
                      />
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-dark-200 mb-2">
                      Skills
                    </label>
                    <Input
                      type="text"
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      placeholder="React, Node.js, Python (comma separated)"
                    />
                    <p className="text-xs text-gray-500 dark:text-dark-400 mt-1">
                      Separate skills with commas
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      type="submit"
                      variant="primary"
                      icon={FiSave}
                      disabled={loading}
                      className="flex-1"
                    >
                      {loading ? 'Saving...' : 'Save Changes'}
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={onClose}
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EditProfileModal;

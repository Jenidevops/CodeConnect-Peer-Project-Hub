import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSave, FiX } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { projectsAPI } from '../services/api';
import Input from '../components/common/Input';
import Textarea from '../components/common/Textarea';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    displayName: '',
    description: '',
    githubRepo: '',
    liveDemo: '',
    tags: '',
  });

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      const response = await projectsAPI.getById(id);
      const project = response.data.data;

      // Check if user is the owner
      if (project.authorId !== user?.uid) {
        toast.error('You do not have permission to edit this project');
        navigate('/feed');
        return;
      }

      setFormData({
        title: project.title,
        displayName: project.displayName || '',
        description: project.description,
        githubRepo: project.githubRepo || '',
        liveDemo: project.liveDemo || '',
        tags: project.tags?.join(', ') || '',
      });
    } catch (error) {
      console.error('Error fetching project:', error);
      toast.error('Failed to load project');
      navigate('/feed');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSubmitting(true);

    try {
      const projectData = {
        title: formData.title.trim(),
        displayName: formData.displayName.trim(),
        description: formData.description.trim(),
        githubRepo: formData.githubRepo.trim(),
        liveDemo: formData.liveDemo.trim(),
        tags: formData.tags
          .split(',')
          .map(tag => tag.trim())
          .filter(tag => tag),
      };

      console.log('Updating project with data:', projectData);
      
      await projectsAPI.update(id, projectData);
      toast.success('Project updated successfully!');
      navigate(`/projects/${id}`);
    } catch (error) {
      console.error('Error updating project:', error);
      toast.error(error.response?.data?.message || 'Failed to update project');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4 pb-12">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold gradient-text mb-2">
              Edit Project
            </h1>
            <p className="text-gray-600 dark:text-dark-300">
              Update your project details
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="card p-8 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-dark-200">
                Project Title *
              </label>
              <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="My Awesome Project"
                required
              />
            </div>

            {/* Display Name */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-dark-200">
                Display Name
              </label>
              <Input
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                placeholder="e.g., CineFlux, BulkMail, StudentDB"
                maxLength={15}
              />
              <p className="text-sm text-gray-500 dark:text-dark-400 mt-1">
                Short name to display on project card (max 15 characters, optional)
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-dark-200">
                Description *
              </label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your project, its features, and what makes it special..."
                rows={6}
                required
              />
            </div>

            {/* GitHub Repository */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-dark-200">
                GitHub Repository
              </label>
              <Input
                type="url"
                name="githubRepo"
                value={formData.githubRepo}
                onChange={handleChange}
                placeholder="https://github.com/username/repo"
              />
            </div>

            {/* Live Demo */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-dark-200">
                Live Demo URL
              </label>
              <Input
                type="url"
                name="liveDemo"
                value={formData.liveDemo}
                onChange={handleChange}
                placeholder="https://myproject.com"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-dark-200">
                Tags
              </label>
              <Input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="React, Node.js, MongoDB, etc. (comma-separated)"
              />
              <p className="text-sm text-gray-500 dark:text-dark-400 mt-1">
                Separate tags with commas
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={submitting}
                icon={FiSave}
                className="flex-1"
              >
                {submitting ? <LoadingSpinner size="sm" /> : 'Save Changes'}
              </Button>
              <Button
                type="button"
                variant="secondary"
                icon={FiX}
                onClick={() => navigate(`/projects/${id}`)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default EditProject;

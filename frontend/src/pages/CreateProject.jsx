import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSave, FiX } from 'react-icons/fi';
import { projectsAPI } from '../services/api';
import Input from '../components/common/Input';
import Textarea from '../components/common/Textarea';
import Button from '../components/common/Button';
import toast from 'react-hot-toast';

const CreateProject = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    displayName: '',
    description: '',
    tags: '',
    githubRepo: '',
    liveDemo: '',
    thumbnail: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (formData.githubRepo && !formData.githubRepo.match(/^https?:\/\/(www\.)?github\.com\/.+/)) {
      newErrors.githubRepo = 'Please enter a valid GitHub URL';
    }
    
    if (formData.liveDemo && !formData.liveDemo.match(/^https?:\/\/.+/)) {
      newErrors.liveDemo = 'Please enter a valid URL';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    try {
      setLoading(true);
      const tags = formData.tags.split(',').map(tag => tag.trim()).filter(Boolean);
      
      const projectData = {
        ...formData,
        tags
      };

      console.log('Submitting project data:', projectData);
      
      const response = await projectsAPI.create(projectData);
      console.log('Project created:', response.data);
      
      toast.success('Project created successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error(error.response?.data?.message || 'Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 px-4 pb-12">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold gradient-text mb-2">
            Create New Project
          </h1>
          <p className="text-gray-600 dark:text-dark-300 mb-8">
            Share your amazing work with the community
          </p>

          <form onSubmit={handleSubmit} className="card p-8">
            <div className="space-y-6">
              <Input
                label="Project Title *"
                name="title"
                value={formData.title}
                onChange={handleChange}
                error={errors.title}
                placeholder="My Awesome Project"
                maxLength={100}
              />

              <div>
                <Input
                  label="Display Name"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  error={errors.displayName}
                  placeholder="Short Display Name"
                  maxLength={15}
                />
                <p className="text-sm text-gray-500 dark:text-dark-400 mt-1">
                  Short name to display on project card (max 15 characters, optional)
                </p>
              </div>

              <Textarea
                label="Description *"
                name="description"
                value={formData.description}
                onChange={handleChange}
                error={errors.description}
                placeholder="Describe your project..."
                rows={6}
                maxLength={2000}
              />

              <Input
                label="Tags (comma separated)"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="React, Node.js, MongoDB"
              />

              <Input
                label="GitHub Repository URL"
                name="githubRepo"
                value={formData.githubRepo}
                onChange={handleChange}
                error={errors.githubRepo}
                placeholder="https://github.com/username/repo"
              />

              <Input
                label="Live Demo URL"
                name="liveDemo"
                value={formData.liveDemo}
                onChange={handleChange}
                error={errors.liveDemo}
                placeholder="https://your-project.com"
              />

              <Input
                label="Thumbnail URL (optional)"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="flex gap-4 mt-8">
              <Button
                type="submit"
                disabled={loading}
                icon={FiSave}
                className="flex-1"
              >
                {loading ? 'Creating...' : 'Create Project'}
              </Button>
              <Button
                type="button"
                variant="secondary"
                icon={FiX}
                onClick={() => navigate('/dashboard')}
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

export default CreateProject;

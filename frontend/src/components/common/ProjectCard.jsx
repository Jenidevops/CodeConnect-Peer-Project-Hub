import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiMessageCircle, FiEye, FiStar, FiGithub, FiExternalLink } from 'react-icons/fi';
import { useState } from 'react';
import StarRating from './StarRating';

const ProjectCard = ({ project, onLike, onBookmark, isBookmarked = false }) => {
  const [imageError, setImageError] = useState(false);

  // Use displayName if available, otherwise generate smart abbreviation from title
  const getSmartAbbreviation = (title) => {
    if (!title) return 'Project';
    
    const words = title.trim().split(/\s+/);
    if (words.length === 1) {
      const word = words[0];
      return word.length <= 10 ? word : word.substring(0, 8);
    } else if (words.length === 2) {
      const first = words[0];
      const secondInitial = words[1][0].toUpperCase();
      return first.length <= 7 ? first + secondInitial : first.substring(0, 6) + secondInitial;
    } else {
      // For 3+ words, use initials
      return words.slice(0, 3).map(w => w[0].toUpperCase()).join('');
    }
  };
  
  const displayText = (project.displayName && project.displayName.trim()) 
    ? project.displayName 
    : getSmartAbbreviation(project.title);

  // Generate random gradient based on project title
  const getGradientColors = (title) => {
    const gradients = [
      'from-teal-400 to-cyan-600',
      'from-purple-400 to-pink-600',
      'from-orange-400 to-red-600',
      'from-green-400 to-emerald-600',
      'from-blue-400 to-indigo-600',
      'from-yellow-400 to-orange-600',
      'from-pink-400 to-rose-600',
      'from-indigo-400 to-purple-600',
    ];
    
    // Use title length to consistently pick a gradient
    const index = title.length % gradients.length;
    return gradients[index];
  };

  const gradientClass = getGradientColors(project.title);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className="card card-hover overflow-hidden group"
    >
      {/* Thumbnail */}
      <Link to={`/projects/${project._id}`} className="block relative overflow-hidden">
        <div className={`aspect-video bg-gradient-to-br ${gradientClass} flex items-center justify-center relative`}>
          {/* Project Display Name */}
          <div className="text-white text-4xl md:text-5xl font-extrabold tracking-wide drop-shadow-2xl transform group-hover:scale-110 transition-transform duration-500 px-4 text-center">
            {displayText}
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-4 right-4 w-16 h-16 border-4 border-white/20 rounded-lg rotate-12 group-hover:rotate-45 transition-transform duration-500"></div>
          <div className="absolute bottom-4 left-4 w-12 h-12 border-4 border-white/20 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">
        {/* Author Info */}
        <div className="flex items-center space-x-2 mb-3">
          <img
            src={project.authorPhoto || '/default-avatar.png'}
            alt={project.authorName}
            className="w-8 h-8 rounded-full border-2 border-primary-500"
          />
          <div className="flex-1 min-w-0">
            <Link
              to={`/profile/${project.authorId}`}
              className="text-sm font-medium text-gray-900 dark:text-dark-50 hover:text-primary-600 dark:hover:text-primary-400 truncate block"
            >
              {project.authorName}
            </Link>
          </div>
        </div>

        {/* Title */}
        <Link to={`/projects/${project._id}`}>
          <h3 className="text-lg font-bold text-gray-900 dark:text-dark-50 mb-2 line-clamp-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            {project.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-dark-300 line-clamp-2 mb-4">
          {project.description}
        </p>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="tag text-xs">
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="tag text-xs">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Stats & Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-dark-700">
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-dark-400">
            {/* Rating */}
            {project.rating && project.rating.count > 0 && (
              <div className="flex items-center space-x-1">
                <StarRating value={project.rating.average} readonly size="sm" />
                <span className="text-xs">({project.rating.count})</span>
              </div>
            )}
            <div className="flex items-center space-x-1">
              <FiHeart className="text-base" />
              <span>{project.likesCount || 0}</span>
            </div>
            <div className="flex items-center space-x-1">
              <FiMessageCircle className="text-base" />
              <span>{project.commentsCount || 0}</span>
            </div>
            <div className="flex items-center space-x-1">
              <FiEye className="text-base" />
              <span>{project.viewsCount || 0}</span>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center space-x-2">
            {project.githubRepo && (
              <a
                href={project.githubRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
                title="View on GitHub"
              >
                <FiGithub className="text-lg text-gray-600 dark:text-dark-300" />
              </a>
            )}
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
                title="View Live Demo"
              >
                <FiExternalLink className="text-lg text-gray-600 dark:text-dark-300" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;

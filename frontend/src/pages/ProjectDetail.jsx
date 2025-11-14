import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiHeart, 
  FiMessageCircle, 
  FiEye, 
  FiGithub, 
  FiExternalLink,
  FiBookmark,
  FiEdit,
  FiTrash2,
  FiShield
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { projectsAPI, commentsAPI } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Button from '../components/common/Button';
import StarRating from '../components/common/StarRating';
import toast from 'react-hot-toast';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [project, setProject] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [ratingStats, setRatingStats] = useState({ average: 0, count: 0 });

  useEffect(() => {
    fetchProject();
    fetchComments();
    if (user) {
      fetchUserRating();
    }
  }, [id, user]);

  const fetchProject = async () => {
    try {
      const response = await projectsAPI.getById(id);
      setProject(response.data.data);
      setRatingStats({
        average: response.data.data.rating?.average || 0,
        count: response.data.data.rating?.count || 0
      });
      if (user) {
        setIsLiked(response.data.data.likes?.includes(user.uid));
      }
    } catch (error) {
      console.error('Error fetching project:', error);
      toast.error('Project not found');
      navigate('/feed');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserRating = async () => {
    try {
      const response = await projectsAPI.getUserRating(id);
      if (response.data.data) {
        setUserRating(response.data.data.rating);
      }
    } catch (error) {
      console.error('Error fetching user rating:', error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await commentsAPI.getByProject(id);
      setComments(response.data.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleLike = async () => {
    if (!user) {
      toast.error('Please sign in to like projects');
      return;
    }

    try {
      await projectsAPI.toggleLike(id);
      setIsLiked(!isLiked);
      setProject(prev => ({
        ...prev,
        likesCount: isLiked ? prev.likesCount - 1 : prev.likesCount + 1
      }));
    } catch (error) {
      toast.error('Failed to update like');
    }
  };

  const handleRating = async (rating) => {
    if (!user) {
      toast.error('Please sign in to rate projects');
      return;
    }

    if (isOwner) {
      toast.error('You cannot rate your own project');
      return;
    }

    try {
      await projectsAPI.rateProject(id, rating);
      setUserRating(rating);
      // Fetch updated project to get new average
      const response = await projectsAPI.getById(id);
      setRatingStats({
        average: response.data.data.rating?.average || 0,
        count: response.data.data.rating?.count || 0
      });
      toast.success('Rating submitted!');
    } catch (error) {
      toast.error('Failed to submit rating');
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please sign in to comment');
      return;
    }

    if (!newComment.trim()) return;

    try {
      await commentsAPI.create(id, { content: newComment });
      setNewComment('');
      fetchComments();
      toast.success('Comment added!');
    } catch (error) {
      toast.error('Failed to add comment');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      await projectsAPI.delete(id);
      toast.success('Project deleted');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to delete project');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!project) return null;

  const isOwner = user?.uid === project.authorId;
  const isAdmin = user?.email === 'jenidevops@gmail.com';

  // Show sign-in prompt if user is not authenticated
  if (!user) {
    return (
      <div className="min-h-screen pt-24 px-4 pb-12">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Preview Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-dark-50 mb-4">
                {project.title}
              </h1>

              {/* Author */}
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src={project.authorPhoto || '/default-avatar.png'}
                  alt={project.authorName}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-dark-50">
                    {project.authorName}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-dark-400">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Preview Stats */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-dark-800">
                  <FiHeart />
                  <span>{project.likesCount || 0}</span>
                </div>
                <div className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-dark-800">
                  <FiMessageCircle />
                  <span>{project.commentsCount || 0}</span>
                </div>
                <div className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-dark-800">
                  <FiEye />
                  <span>{project.viewsCount || 0}</span>
                </div>
              </div>
            </div>

            {/* Sign-in Required Card */}
            <div className="card p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 mx-auto mb-6 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                  <FiExternalLink className="text-4xl text-primary-600 dark:text-primary-400" />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-dark-50">
                  Sign in to view this project
                </h2>
                <p className="text-lg text-gray-600 dark:text-dark-300 mb-8">
                  Create an account or sign in to view full project details, like, comment, and explore code.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => navigate('/login')}
                    variant="primary"
                    size="lg"
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={() => navigate('/feed')}
                    variant="secondary"
                    size="lg"
                  >
                    Back to Explore
                  </Button>
                </div>
              </div>
            </div>

            {/* Preview Tags if available */}
            {project.tags && project.tags.length > 0 && (
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-500 dark:text-dark-400 mb-3">Technologies used:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    );
  }

  // Full content for authenticated users

  return (
    <div className="min-h-screen pt-24 px-4 pb-12">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-dark-50">
                {project.title}
              </h1>
              {(isOwner || isAdmin) && (
                <div className="flex gap-2">
                  {isOwner && (
                    <Link to={`/edit/${project._id}`}>
                      <Button variant="secondary" size="sm" icon={FiEdit}>
                        Edit
                      </Button>
                    </Link>
                  )}
                  <Button 
                    variant="danger" 
                    size="sm" 
                    icon={FiTrash2}
                    onClick={handleDelete}
                  >
                    {isAdmin && !isOwner ? (
                      <>
                        <FiShield className="mr-1" />
                        Admin Delete
                      </>
                    ) : (
                      'Delete'
                    )}
                  </Button>
                </div>
              )}
            </div>

            {/* Author */}
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={project.authorPhoto || '/default-avatar.png'}
                alt={project.authorName}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <div className="flex items-center gap-2">
                  <Link
                    to={`/profile/${project.authorId}`}
                    className="font-semibold text-gray-900 dark:text-dark-50 hover:text-primary-600"
                  >
                    {project.authorName}
                  </Link>
                  {project.authorEmail === 'jenidevops@gmail.com' && (
                    <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-primary-500 text-white flex items-center gap-1">
                      <FiShield className="text-xs" />
                      ADMIN
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 dark:text-dark-400">
                  {new Date(project.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Stats & Actions */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  isLiked
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                    : 'bg-gray-100 dark:bg-dark-800 text-gray-700 dark:text-dark-200'
                }`}
              >
                <FiHeart className={isLiked ? 'fill-current' : ''} />
                <span>{project.likesCount || 0}</span>
              </button>

              <div className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-dark-800">
                <FiMessageCircle />
                <span>{project.commentsCount || 0}</span>
              </div>

              <div className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-dark-800">
                <FiEye />
                <span>{project.viewsCount || 0}</span>
              </div>

              {project.githubRepo && (
                <a
                  href={project.githubRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-900 dark:bg-dark-700 text-white hover:bg-gray-800"
                >
                  <FiGithub />
                  <span>View Code</span>
                </a>
              )}

              {project.liveDemo && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600"
                >
                  <FiExternalLink />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="card p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">About this project</h2>
            <p className="text-gray-700 dark:text-dark-200 whitespace-pre-wrap">
              {project.description}
            </p>

            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {project.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Rating Section */}
          <div className="card p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Rating</h2>
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
              {/* Average Rating Display */}
              <div className="text-center">
                <div className="text-5xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {ratingStats.average > 0 ? ratingStats.average.toFixed(1) : 'N/A'}
                </div>
                <StarRating 
                  value={ratingStats.average} 
                  readonly 
                  size="lg"
                />
                <p className="text-sm text-gray-500 dark:text-dark-400 mt-2">
                  {ratingStats.count} {ratingStats.count === 1 ? 'rating' : 'ratings'}
                </p>
              </div>

              {/* User Rating Input */}
              {!isOwner && user && (
                <div className="flex-1">
                  <p className="text-lg font-semibold mb-3">
                    {userRating > 0 ? 'Your Rating:' : 'Rate this project:'}
                  </p>
                  <StarRating 
                    value={userRating} 
                    onChange={handleRating}
                    size="xl"
                  />
                  {userRating > 0 && (
                    <p className="text-sm text-gray-500 dark:text-dark-400 mt-2">
                      Click a star to update your rating
                    </p>
                  )}
                </div>
              )}

              {isOwner && (
                <div className="flex-1 text-gray-500 dark:text-dark-400">
                  <p>You cannot rate your own project</p>
                </div>
              )}
            </div>
          </div>

          {/* Comments */}
          <div className="card p-8">
            <h2 className="text-2xl font-bold mb-6">
              Comments ({comments.length})
            </h2>

            {user && (
              <form onSubmit={handleCommentSubmit} className="mb-8">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="textarea mb-4"
                  rows={3}
                />
                <Button type="submit" disabled={!newComment.trim()}>
                  Post Comment
                </Button>
              </form>
            )}

            <div className="space-y-4">
              {comments.map((comment) => (
                <div
                  key={comment._id}
                  className="flex space-x-3 p-4 rounded-lg bg-gray-50 dark:bg-dark-800"
                >
                  <img
                    src={comment.authorPhoto || '/default-avatar.png'}
                    alt={comment.authorName}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold text-gray-900 dark:text-dark-50">
                        {comment.authorName}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-dark-400">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-dark-200">
                      {comment.content}
                    </p>
                  </div>
                </div>
              ))}

              {comments.length === 0 && (
                <p className="text-center text-gray-500 dark:text-dark-400 py-8">
                  No comments yet. Be the first to comment!
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail;

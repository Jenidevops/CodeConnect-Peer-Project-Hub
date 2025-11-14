import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { bookmarksAPI } from '../services/api';
import ProjectCard from '../components/common/ProjectCard';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Favorites = () => {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchBookmarks();
    }
  }, [user]);

  const fetchBookmarks = async () => {
    try {
      const response = await bookmarksAPI.getAll();
      setBookmarks(response.data.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 px-4 pb-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold gradient-text mb-2">
            Favorite Projects
          </h1>
          <p className="text-gray-600 dark:text-dark-300">
            Projects you've bookmarked for later
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        ) : bookmarks.length === 0 ? (
          <div className="text-center py-20 card">
            <p className="text-gray-500 dark:text-dark-400 text-lg">
              No favorites yet. Start exploring projects!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarks.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;

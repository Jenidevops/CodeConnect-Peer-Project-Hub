import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter } from 'react-icons/fi';
import { projectsAPI } from '../services/api';
import ProjectCard from '../components/common/ProjectCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Input from '../components/common/Input';
import toast from 'react-hot-toast';

const Feed = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  
  // Intersection Observer for infinite scroll
  const observerRef = useRef();
  const lastProjectRef = useCallback(node => {
    if (loadingMore) return;
    if (observerRef.current) observerRef.current.disconnect();
    
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    
    if (node) observerRef.current.observe(node);
  }, [loadingMore, hasMore]);

  useEffect(() => {
    fetchProjects();
  }, [sortBy, page]);

  const fetchProjects = async () => {
    try {
      if (page === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      
      const response = await projectsAPI.getAll({
        page,
        limit: 12,
        search,
        sortBy
      });
      
      if (page === 1) {
        setProjects(response.data.data);
      } else {
        setProjects(prev => [...prev, ...response.data.data]);
      }
      
      setHasMore(response.data.pagination.hasMore);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchProjects();
  };

  return (
    <div className="min-h-screen pt-24 px-4 pb-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold gradient-text mb-4">
            Explore Projects
          </h1>
          <p className="text-gray-600 dark:text-dark-300">
            Discover amazing projects from talented developers
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <form onSubmit={handleSearch} className="flex-1">
            <Input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={FiSearch}
            />
          </form>

          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setPage(1);
            }}
            className="input w-full md:w-48"
          >
            <option value="recent">Most Recent</option>
            <option value="popular">Most Popular</option>
            <option value="rated">Highest Rated</option>
          </select>
        </div>

        {/* Projects Grid */}
        {loading && page === 1 ? (
          <div className="flex justify-center items-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-dark-400 text-lg">
              No projects found. Be the first to share!
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => {
                // Attach ref to last element for infinite scroll
                if (projects.length === index + 1) {
                  return (
                    <div key={project._id} ref={lastProjectRef}>
                      <ProjectCard project={project} />
                    </div>
                  );
                } else {
                  return <ProjectCard key={project._id} project={project} />;
                }
              })}
            </div>

            {/* Loading indicator for infinite scroll */}
            {loadingMore && (
              <div className="flex justify-center mt-12">
                <LoadingSpinner size="lg" />
                <span className="ml-3 text-gray-600 dark:text-dark-300">Loading more projects...</span>
              </div>
            )}
            
            {/* End message */}
            {!hasMore && projects.length > 0 && (
              <div className="text-center mt-12">
                <p className="text-gray-500 dark:text-dark-400">
                  You've reached the end! 🎉
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Feed;

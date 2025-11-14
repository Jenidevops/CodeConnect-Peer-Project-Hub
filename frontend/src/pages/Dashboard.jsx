import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { usersAPI } from '../services/api';
import ProjectCard from '../components/common/ProjectCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Button from '../components/common/Button';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalLikes: 0,
    totalViews: 0
  });

  useEffect(() => {
    if (user) {
      fetchUserProjects();
    }
  }, [user]);

  const fetchUserProjects = async () => {
    try {
      setLoading(true);
      const response = await usersAPI.getProjects(user.uid);
      setProjects(response.data.data);
      
      // Calculate stats
      const totalLikes = response.data.data.reduce((sum, p) => sum + (p.likesCount || 0), 0);
      const totalViews = response.data.data.reduce((sum, p) => sum + (p.viewsCount || 0), 0);
      
      setStats({
        totalProjects: response.data.data.length,
        totalLikes,
        totalViews
      });
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load your projects');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 px-4 pb-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">
              My Dashboard
            </h1>
            <p className="text-gray-600 dark:text-dark-300">
              Manage your projects and track your impact
            </p>
          </div>
          <Link to="/create">
            <Button icon={FiPlus} className="mt-4 md:mt-0">
              New Project
            </Button>
          </Link>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: 'Projects', value: stats.totalProjects, color: 'from-blue-500 to-cyan-500' },
            { label: 'Total Likes', value: stats.totalLikes, color: 'from-pink-500 to-rose-500' },
            { label: 'Total Views', value: stats.totalViews, color: 'from-purple-500 to-indigo-500' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card p-6"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center mb-4`}>
                <span className="text-2xl text-white font-bold">{stat.value}</span>
              </div>
              <p className="text-gray-600 dark:text-dark-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Projects */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-dark-50">
            Your Projects
          </h2>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <LoadingSpinner size="lg" />
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20 card">
              <p className="text-gray-500 dark:text-dark-400 text-lg mb-4">
                You haven't created any projects yet
              </p>
              <Link to="/create">
                <Button icon={FiPlus}>Create Your First Project</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

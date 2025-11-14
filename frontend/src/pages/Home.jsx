import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { FiGithub, FiCode, FiUsers, FiHeart, FiArrowRight, FiTrendingUp, FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { usersAPI } from '../services/api';

const Home = () => {
  const { user, signInWithGoogle, signInWithGithub } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalUsers: 0,
    mostLikedProjects: [],
    highestRatedProjects: []
  });
  const [statsLoading, setStatsLoading] = useState(true);
  const [likedIndex, setLikedIndex] = useState(0);
  const [ratedIndex, setRatedIndex] = useState(0);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await usersAPI.getStats();
      setStats(response.data.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setStatsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      navigate('/feed');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGithubSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGithub();
      navigate('/feed');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: FiCode,
      title: 'Showcase Your Work',
      description: 'Display your projects with live demos, source code, and detailed documentation in one place'
    },
    {
      icon: FiUsers,
      title: 'Build Together',
      description: 'Connect with developers worldwide, collaborate on ideas, and grow your network'
    },
    {
      icon: FiHeart,
      title: 'Get Discovered',
      description: 'Let the community explore, bookmark, and rate your projects to boost your visibility'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden">
        {/* Subtle Background */}
        <div className="absolute inset-0 -z-10">
          <motion.div 
            className="absolute top-1/4 -left-20 w-96 h-96 bg-primary-400/5 dark:bg-primary-500/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary-300/5 dark:bg-primary-400/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 dark:text-white">
              Welcome to{' '}
              <span className="text-primary-500">CodeConnect</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-600 dark:text-dark-300 mb-4 max-w-3xl mx-auto leading-relaxed">
              Share your projects with the world
            </p>
            <p className="text-lg md:text-xl text-gray-500 dark:text-dark-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Push your ideas to the CodeConnect peer project instantly. One platform with everything you need to make real apps live.
            </p>

            {/* Sign-in Buttons */}
            {!user ? (
              <>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                  <Button
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    size="lg"
                    variant="primary"
                    className="w-full sm:w-auto min-w-[240px]"
                  >
                    {loading ? (
                      <LoadingSpinner size="sm" className="mr-2" />
                    ) : (
                      <FcGoogle className="text-2xl mr-2" />
                    )}
                    Continue with Google
                  </Button>
                  <Button
                    onClick={handleGithubSignIn}
                    disabled={loading}
                    size="lg"
                    variant="secondary"
                    className="w-full sm:w-auto min-w-[240px]"
                  >
                    <FiGithub className="text-2xl mr-2" />
                    Continue with GitHub
                  </Button>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <p className="text-gray-500 dark:text-dark-400">
                    Already have an account?{' '}
                    <button
                      onClick={() => navigate('/login')}
                      className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
                    >
                      Sign in with email
                    </button>
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="h-px w-16 bg-gray-300 dark:bg-dark-600"></div>
                    <span className="text-sm text-gray-400 dark:text-dark-500">or</span>
                    <div className="h-px w-16 bg-gray-300 dark:bg-dark-600"></div>
                  </div>
                  <p className="text-gray-500 dark:text-dark-400">
                    New to CodeConnect?{' '}
                    <button
                      onClick={() => navigate('/signup')}
                      className="text-primary-600 dark:text-primary-400 hover:underline font-semibold"
                    >
                      Create an account
                    </button>
                  </p>
                </div>
              </>
            ) : (
              <Button
                onClick={() => navigate('/feed')}
                size="lg"
                variant="primary"
              >
                Explore Projects
                <FiArrowRight className="ml-2 text-xl" />
              </Button>
            )}
          </motion.div>
        </div>
      </section>

      {/* Platform Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {statsLoading ? (
            <div className="flex justify-center">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Total Projects */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="card p-6 text-center bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border-primary-200 dark:border-primary-700/50"
              >
                <FiCode className="text-4xl text-primary-600 dark:text-primary-400 mx-auto mb-3" />
                <p className="text-4xl font-bold text-primary-700 dark:text-primary-300 mb-1">
                  {stats.totalProjects}
                </p>
                <p className="text-gray-600 dark:text-dark-300 font-medium">Total Projects</p>
              </motion.div>

              {/* Total Users */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="card p-6 text-center bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700/50"
              >
                <FiUsers className="text-4xl text-purple-600 dark:text-purple-400 mx-auto mb-3" />
                <p className="text-4xl font-bold text-purple-700 dark:text-purple-300 mb-1">
                  {stats.totalUsers}
                </p>
                <p className="text-gray-600 dark:text-dark-300 font-medium">Developers</p>
              </motion.div>

              {/* Most Liked Project Carousel */}
              {stats.mostLikedProjects && stats.mostLikedProjects.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="card p-6 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-700/50 relative overflow-hidden"
                >
                  {/* Carousel Navigation */}
                  {stats.mostLikedProjects.length > 1 && (
                    <>
                      <button
                        onClick={() => setLikedIndex((prev) => (prev - 1 + stats.mostLikedProjects.length) % stats.mostLikedProjects.length)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white dark:bg-dark-800 shadow-lg hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
                      >
                        <FiChevronLeft className="text-xl text-red-600 dark:text-red-400" />
                      </button>
                      <button
                        onClick={() => setLikedIndex((prev) => (prev + 1) % stats.mostLikedProjects.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white dark:bg-dark-800 shadow-lg hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
                      >
                        <FiChevronRight className="text-xl text-red-600 dark:text-red-400" />
                      </button>
                    </>
                  )}

                  {/* Current Project Display */}
                  <div 
                    className="text-center cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => navigate(`/projects/${stats.mostLikedProjects[likedIndex]._id}`)}
                  >
                    <FiHeart className="text-4xl text-red-600 dark:text-red-400 mx-auto mb-3" />
                    <p className="text-2xl font-bold text-red-700 dark:text-red-300 mb-1">
                      {stats.mostLikedProjects[likedIndex].likesCount} ❤️
                    </p>
                    <p className="text-gray-600 dark:text-dark-300 font-medium mb-1">Most Liked</p>
                    <p className="text-sm text-gray-700 dark:text-dark-200 font-semibold truncate px-8 mb-1">
                      {stats.mostLikedProjects[likedIndex].title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-dark-400 mb-2">
                      by {stats.mostLikedProjects[likedIndex].authorName}
                    </p>
                    
                    {/* Carousel Indicators */}
                    {stats.mostLikedProjects.length > 1 && (
                      <div className="flex justify-center gap-1.5 mt-3">
                        {stats.mostLikedProjects.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={(e) => {
                              e.stopPropagation();
                              setLikedIndex(idx);
                            }}
                            className={`h-1.5 rounded-full transition-all ${
                              idx === likedIndex 
                                ? 'w-6 bg-red-600 dark:bg-red-400' 
                                : 'w-1.5 bg-red-300 dark:bg-red-600'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                    
                    <p className="text-xs text-primary-600 dark:text-primary-400 mt-3">
                      Click to view →
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Highest Rated Project Carousel */}
              {stats.highestRatedProjects && stats.highestRatedProjects.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="card p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200 dark:border-yellow-700/50 relative overflow-hidden"
                >
                  {/* Carousel Navigation */}
                  {stats.highestRatedProjects.length > 1 && (
                    <>
                      <button
                        onClick={() => setRatedIndex((prev) => (prev - 1 + stats.highestRatedProjects.length) % stats.highestRatedProjects.length)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white dark:bg-dark-800 shadow-lg hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
                      >
                        <FiChevronLeft className="text-xl text-yellow-600 dark:text-yellow-400" />
                      </button>
                      <button
                        onClick={() => setRatedIndex((prev) => (prev + 1) % stats.highestRatedProjects.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white dark:bg-dark-800 shadow-lg hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
                      >
                        <FiChevronRight className="text-xl text-yellow-600 dark:text-yellow-400" />
                      </button>
                    </>
                  )}

                  {/* Current Project Display */}
                  <div 
                    className="text-center cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => navigate(`/projects/${stats.highestRatedProjects[ratedIndex]._id}`)}
                  >
                    <FiStar className="text-4xl text-yellow-600 dark:text-yellow-400 mx-auto mb-3" />
                    <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-300 mb-1">
                      {stats.highestRatedProjects[ratedIndex].rating.average.toFixed(1)} ⭐
                    </p>
                    <p className="text-gray-600 dark:text-dark-300 font-medium mb-1">Top Rated</p>
                    <p className="text-sm text-gray-700 dark:text-dark-200 font-semibold truncate px-8 mb-1">
                      {stats.highestRatedProjects[ratedIndex].title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-dark-400 mb-2">
                      by {stats.highestRatedProjects[ratedIndex].authorName} • {stats.highestRatedProjects[ratedIndex].rating.count} ratings
                    </p>
                    
                    {/* Carousel Indicators */}
                    {stats.highestRatedProjects.length > 1 && (
                      <div className="flex justify-center gap-1.5 mt-3">
                        {stats.highestRatedProjects.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={(e) => {
                              e.stopPropagation();
                              setRatedIndex(idx);
                            }}
                            className={`h-1.5 rounded-full transition-all ${
                              idx === ratedIndex 
                                ? 'w-6 bg-yellow-600 dark:bg-yellow-400' 
                                : 'w-1.5 bg-yellow-300 dark:bg-yellow-600'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                    
                    <p className="text-xs text-primary-600 dark:text-primary-400 mt-3">
                      Click to view →
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-dark-800/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-primary-500 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300 shadow-lg">
                  <feature.icon className="text-3xl text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-dark-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="py-24 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl bg-primary-500 p-12 md:p-16 text-white text-center shadow-2xl"
            >
              {/* Subtle Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                  backgroundSize: '24px 24px'
                }} />
              </div>
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  Start sharing your projects today
                </h2>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                  Join thousands of developers building, sharing, and discovering amazing projects on CodeConnect
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    size="lg"
                    className="bg-white text-primary-600 hover:bg-gray-100 min-w-[240px]"
                  >
                    {loading ? (
                      <LoadingSpinner size="sm" className="mr-2" />
                    ) : (
                      <FcGoogle className="text-2xl mr-2" />
                    )}
                    Get Started Free
                  </Button>
                  <Button
                    onClick={handleGithubSignIn}
                    disabled={loading}
                    size="lg"
                    className="bg-gray-900 text-white hover:bg-gray-800 min-w-[240px]"
                  >
                    <FiGithub className="text-2xl mr-2" />
                    Sign in with GitHub
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;

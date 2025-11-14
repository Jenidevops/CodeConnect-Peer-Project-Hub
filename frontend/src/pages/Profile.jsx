import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMapPin, FiGlobe, FiGithub, FiLinkedin, FiMail, FiEdit, FiShield } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { usersAPI } from '../services/api';
import ProjectCard from '../components/common/ProjectCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Button from '../components/common/Button';
import EditProfileModal from '../components/common/EditProfileModal';

const Profile = () => {
  const { userId } = useParams();
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetchUserProfile();
    fetchUserProjects();
  }, [userId]);

  const fetchUserProfile = async () => {
    try {
      const response = await usersAPI.getProfile(userId);
      setUserProfile(response.data.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchUserProjects = async () => {
    try {
      const response = await usersAPI.getProjects(userId);
      setProjects(response.data.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const isOwnProfile = user?.uid === userId;
  const isAdmin = userProfile?.email === 'jenidevops@gmail.com';

  return (
    <div className="min-h-screen pt-24 px-4 pb-12">
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {userProfile && (
              <div className="card p-8 mb-8">
                {/* Header with avatar and basic info */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
                  <img
                    src={userProfile.photoURL || '/default-avatar.png'}
                    alt={userProfile.displayName}
                    className="w-24 h-24 rounded-full border-4 border-primary-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold gradient-text">
                        {userProfile.displayName}
                      </h1>
                      {isAdmin && (
                        <span className="px-3 py-1 text-sm font-bold rounded-full bg-primary-500 text-white flex items-center gap-1">
                          <FiShield />
                          ADMIN
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-dark-300 mb-4">
                      {userProfile.projectCount || 0} {userProfile.projectCount === 1 ? 'Project' : 'Projects'}
                    </p>
                    
                    {isOwnProfile && (
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        icon={FiEdit}
                        onClick={() => setIsEditModalOpen(true)}
                      >
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </div>

                {/* Bio */}
                {userProfile.bio && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 dark:text-dark-50 mb-2">Bio</h3>
                    <p className="text-gray-700 dark:text-dark-200 whitespace-pre-wrap">
                      {userProfile.bio}
                    </p>
                  </div>
                )}

                {/* Location & Website */}
                <div className="flex flex-wrap gap-4 mb-6">
                  {userProfile.location && (
                    <div className="flex items-center gap-2 text-gray-600 dark:text-dark-300">
                      <FiMapPin className="text-primary-500" />
                      <span>{userProfile.location}</span>
                    </div>
                  )}
                  {userProfile.website && (
                    <a
                      href={userProfile.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:underline"
                    >
                      <FiGlobe />
                      <span>Website</span>
                    </a>
                  )}
                </div>

                {/* Social Links */}
                {(userProfile.github || userProfile.linkedin || userProfile.email) && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 dark:text-dark-50 mb-3">Connect</h3>
                    <div className="flex gap-3">
                      {userProfile.github && (
                        <a
                          href={userProfile.github.startsWith('http') ? userProfile.github : `https://github.com/${userProfile.github}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-lg bg-gray-100 dark:bg-dark-800 hover:bg-gray-200 dark:hover:bg-dark-700 transition-colors"
                          title="GitHub"
                        >
                          <FiGithub className="text-xl text-gray-700 dark:text-dark-200" />
                        </a>
                      )}
                      {userProfile.linkedin && (
                        <a
                          href={userProfile.linkedin.startsWith('http') ? userProfile.linkedin : `https://linkedin.com/in/${userProfile.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-lg bg-gray-100 dark:bg-dark-800 hover:bg-gray-200 dark:hover:bg-dark-700 transition-colors"
                          title="LinkedIn"
                        >
                          <FiLinkedin className="text-xl text-blue-600 dark:text-blue-400" />
                        </a>
                      )}
                      {userProfile.email && (
                        <a
                          href={`mailto:${userProfile.email}`}
                          className="p-3 rounded-lg bg-gray-100 dark:bg-dark-800 hover:bg-gray-200 dark:hover:bg-dark-700 transition-colors"
                          title="Email"
                        >
                          <FiMail className="text-xl text-gray-700 dark:text-dark-200" />
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Skills */}
                {userProfile.skills && userProfile.skills.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-dark-50 mb-3">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {userProfile.skills.map((skill, index) => (
                        <span key={index} className="tag">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <h2 className="text-2xl font-bold mb-6">Projects</h2>
            {projects.length === 0 ? (
              <div className="text-center py-20 card">
                <p className="text-gray-500 dark:text-dark-400">
                  No projects yet
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Edit Profile Modal */}
      {isOwnProfile && userProfile && (
        <EditProfileModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          userProfile={userProfile}
          onUpdate={() => {
            fetchUserProfile();
          }}
        />
      )}
    </div>
  );
};

export default Profile;

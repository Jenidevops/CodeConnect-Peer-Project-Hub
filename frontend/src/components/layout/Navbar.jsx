import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Logo from '../common/Logo';
import { 
  FiSun, 
  FiMoon, 
  FiMenu, 
  FiX, 
  FiHome, 
  FiGrid, 
  FiHeart, 
  FiUser, 
  FiLogOut,
  FiPlus,
} from 'react-icons/fi';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const navLinks = [
    { to: '/', label: 'Home', icon: FiHome },
    { to: '/feed', label: 'Explore', icon: FiGrid },
  ];

  const userLinks = user ? [
    { to: '/dashboard', label: 'Dashboard', icon: FiUser },
    { to: '/favorites', label: 'Favorites', icon: FiHeart },
  ] : [];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 dark:bg-dark-900/80 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo size="md" />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-4 py-2 rounded-lg text-gray-700 dark:text-dark-200 hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors duration-200 flex items-center space-x-2"
              >
                <link.icon className="text-lg" />
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-dark-800 hover:bg-gray-200 dark:hover:bg-dark-700 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <FiMoon className="text-xl text-gray-700 dark:text-dark-200" />
              ) : (
                <FiSun className="text-xl text-yellow-500" />
              )}
            </button>

            {/* User Section */}
            {user ? (
              <div className="hidden md:flex items-center space-x-3">
                <Link
                  to="/create"
                  className="btn btn-primary flex items-center space-x-2"
                >
                  <FiPlus className="text-lg" />
                  <span>New Project</span>
                </Link>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors"
                  >
                    <img
                      src={user.photoURL || '/default-avatar.png'}
                      alt={user.displayName}
                      className="w-9 h-9 rounded-full border-2 border-primary-500"
                    />
                  </button>

                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-56 card py-2"
                      >
                        <div className="px-4 py-3 border-b border-gray-200 dark:border-dark-700">
                          <p className="text-sm font-semibold text-gray-900 dark:text-dark-50">
                            {user.displayName}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-dark-400 truncate">
                            {user.email}
                          </p>
                        </div>

                        {userLinks.map((link) => (
                          <Link
                            key={link.to}
                            to={link.to}
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors text-gray-700 dark:text-dark-200"
                          >
                            <link.icon className="text-lg" />
                            <span>{link.label}</span>
                          </Link>
                        ))}

                        <button
                          onClick={handleSignOut}
                          className="flex items-center space-x-2 px-4 py-2 w-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-600 dark:text-red-400"
                        >
                          <FiLogOut className="text-lg" />
                          <span>Sign Out</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              <Link to="/login" className="hidden md:block btn btn-primary">
                Sign In
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-dark-800"
            >
              {mobileMenuOpen ? (
                <FiX className="text-xl text-gray-700 dark:text-dark-200" />
              ) : (
                <FiMenu className="text-xl text-gray-700 dark:text-dark-200" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-dark-900 border-t border-gray-200 dark:border-dark-700"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-2 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800 text-gray-700 dark:text-dark-200"
                >
                  <link.icon className="text-lg" />
                  <span>{link.label}</span>
                </Link>
              ))}

              {user && (
                <>
                  {userLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center space-x-2 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800 text-gray-700 dark:text-dark-200"
                    >
                      <link.icon className="text-lg" />
                      <span>{link.label}</span>
                    </Link>
                  ))}

                  <Link
                    to="/create"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center space-x-2 px-4 py-3 rounded-lg bg-primary-500 hover:bg-primary-600 text-white shadow-lg"
                  >
                    <FiPlus className="text-lg" />
                    <span>New Project</span>
                  </Link>

                  <button
                    onClick={() => {
                      handleSignOut();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 px-4 py-3 w-full rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
                  >
                    <FiLogOut className="text-lg" />
                    <span>Sign Out</span>
                  </button>
                </>
              )}

              {!user && (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg bg-primary-500 hover:bg-primary-600 text-white text-center shadow-lg"
                >
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

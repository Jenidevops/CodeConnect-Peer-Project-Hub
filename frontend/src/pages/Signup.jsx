import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { FiMail, FiLock, FiUser, FiGithub } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import toast from 'react-hot-toast';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Signup = () => {
  const { signInWithGoogle, signInWithGithub, signUpWithEmail } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    displayName: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validation
      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match');
        setLoading(false);
        return;
      }
      if (formData.password.length < 6) {
        toast.error('Password must be at least 6 characters');
        setLoading(false);
        return;
      }
      if (!formData.displayName.trim()) {
        toast.error('Please enter your name');
        setLoading(false);
        return;
      }

      await signUpWithEmail(formData.email, formData.password, formData.displayName);
      navigate('/feed');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">
            Create Account
          </h1>
          <p className="text-gray-600 dark:text-dark-300">
            Join CodeConnect and start sharing your projects
          </p>
        </div>

        <div className="card p-8">
          {/* Social Sign In */}
          <div className="space-y-3 mb-6">
            <Button
              onClick={handleGoogleSignIn}
              disabled={loading}
              variant="secondary"
              className="w-full"
            >
              <FcGoogle className="text-xl mr-2" />
              Continue with Google
            </Button>
            <Button
              onClick={handleGithubSignIn}
              disabled={loading}
              variant="secondary"
              className="w-full"
            >
              <FiGithub className="text-xl mr-2" />
              Continue with GitHub
            </Button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-dark-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-dark-800 text-gray-500 dark:text-dark-400">
                Or sign up with email
              </span>
            </div>
          </div>

          {/* Email Sign Up Form */}
          <form onSubmit={handleSignUp} className="space-y-4">
            <Input
              type="text"
              name="displayName"
              placeholder="Full Name"
              value={formData.displayName}
              onChange={handleChange}
              icon={FiUser}
              required
            />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              icon={FiMail}
              required
            />
            <Input
              type="password"
              name="password"
              placeholder="Password (min. 6 characters)"
              value={formData.password}
              onChange={handleChange}
              icon={FiLock}
              required
              minLength={6}
            />
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              icon={FiLock}
              required
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={loading}
            >
              {loading ? <LoadingSpinner size="sm" /> : 'Create Account'}
            </Button>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-dark-300">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-gray-500 dark:text-dark-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;

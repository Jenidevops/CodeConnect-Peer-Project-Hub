import { Link } from 'react-router-dom';
import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi';
import Logo from '../common/Logo';
import LocationTime from '../common/LocationTime';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'Features', path: '/features' },
      { name: 'Explore', path: '/feed' },
      { name: 'Pricing', path: '/pricing' },
    ],
    company: [
      { name: 'About', path: '/about' },
      { name: 'Blog', path: '/blog' },
      { name: 'Careers', path: '/careers' },
    ],
    legal: [
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Cookie Policy', path: '/cookies' },
    ],
    support: [
      { name: 'Help Center', path: '/help' },
      { name: 'Contact', path: '/contact' },
      { name: 'Status', path: '/status' },
    ],
  };

  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com/Jenidevops', label: 'GitHub' },
    { icon: FiLinkedin, href: 'https://www.linkedin.com/in/jeni-devops', label: 'LinkedIn' },
    { icon: FiMail, href: 'mailto:jenidevops@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-dark-900 border-t border-gray-200 dark:border-dark-700">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-8">
          {/* Brand Section - Centered */}
          <div className="col-span-2 md:col-span-6 text-center mb-4">
            <div className="flex justify-center mb-4">
              <Logo size="md" showText={true} />
            </div>
            <p className="text-gray-600 dark:text-dark-300 text-sm leading-relaxed max-w-2xl mx-auto">
              Share your projects with the world. Connect with developers, showcase your work, and discover amazing projects.
            </p>
            {/* Social Links - Centered */}
            <div className="flex items-center justify-center space-x-4 mt-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-dark-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors transform hover:scale-110 duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="text-xl" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Grid - Centered */}
          <div className="col-span-2 md:col-span-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {/* Product Links */}
              <div className="text-center">
                <h3 className="font-bold text-gray-900 dark:text-dark-50 mb-4">Product</h3>
                <ul className="space-y-2">
                  {footerLinks.product.map((link, index) => (
                    <li key={index}>
                      <Link
                        to={link.path}
                        className="text-gray-600 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company Links */}
              <div className="text-center">
                <h3 className="font-bold text-gray-900 dark:text-dark-50 mb-4">Company</h3>
                <ul className="space-y-2">
                  {footerLinks.company.map((link, index) => (
                    <li key={index}>
                      <Link
                        to={link.path}
                        className="text-gray-600 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal Links */}
              <div className="text-center">
                <h3 className="font-bold text-gray-900 dark:text-dark-50 mb-4">Legal</h3>
                <ul className="space-y-2">
                  {footerLinks.legal.map((link, index) => (
                    <li key={index}>
                      <Link
                        to={link.path}
                        className="text-gray-600 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support Links */}
              <div className="text-center">
                <h3 className="font-bold text-gray-900 dark:text-dark-50 mb-4">Support</h3>
                <ul className="space-y-2">
                  {footerLinks.support.map((link, index) => (
                    <li key={index}>
                      <Link
                        to={link.path}
                        className="text-gray-600 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Centered */}
        <div className="pt-8 border-t border-gray-200 dark:border-dark-700">
          <div className="text-center space-y-4">
            {/* Live Location & Time - Featured */}
            <div className="flex justify-center mb-2">
              <div className="px-6 py-3 bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 rounded-full border border-primary-200 dark:border-primary-700/50">
                <LocationTime />
              </div>
            </div>

            {/* Copyright */}
            <p className="text-gray-600 dark:text-dark-300 text-sm">
              © {currentYear} CodeConnect. All rights reserved.
            </p>
            
            {/* Built with Love - Main Highlight */}
            <p className="text-gray-700 dark:text-dark-200 text-base flex items-center justify-center font-medium">
              Built with{' '}
              <FiHeart className="text-red-500 mx-1 animate-pulse" fill="currentColor" />{' '}
              by{' '}
              <a
                href="https://github.com/Jenidevops"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 font-bold text-primary-600 dark:text-primary-400 hover:underline"
              >
                Jenidevops
              </a>
              , for developers
            </p>

            {/* Tech Stack */}
            <p className="text-gray-500 dark:text-dark-400 text-xs">
              Made with React, Node.js, MongoDB & Firebase
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

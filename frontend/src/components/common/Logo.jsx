import { Link } from 'react-router-dom';

const Logo = ({ className = '', size = 'md', showText = true }) => {
  const sizes = {
    sm: 'h-10',
    md: 'h-12',
    lg: 'h-16',
    xl: 'h-24',
  };

  const textSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
  };

  return (
    <Link to="/" className={`flex items-center gap-3 group ${className}`}>
      {/* Logo Icon */}
      <div className={`${sizes[size]} flex items-center justify-center flex-shrink-0`}>
        <svg
          viewBox="0 0 512 512"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${sizes[size]} transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}
          style={{ transformOrigin: 'center center', position: 'relative', zIndex: 10 }}
        >
          {/* Gradient Definitions */}
          <defs>
            {/* Main Gradient - Teal to Purple */}
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#00c7b7', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#14b8a6', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#a855f7', stopOpacity: 1 }} />
            </linearGradient>
            
            {/* Glow Effect */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Chain Links - Bold and Animated */}
          
          {/* Left Chain Link */}
          <path
            d="M180 256 L130 306 C100 336 100 384 130 414 C160 444 208 444 238 414 L288 364"
            stroke="url(#logoGradient)"
            strokeWidth="48"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            filter="url(#glow)"
            opacity="0.95"
          >
            <animate 
              attributeName="stroke-width" 
              values="48;52;48" 
              dur="2s" 
              repeatCount="indefinite"
            />
          </path>
          
          {/* Right Chain Link */}
          <path
            d="M332 256 L382 206 C412 176 412 128 382 98 C352 68 304 68 274 98 L224 148"
            stroke="url(#logoGradient)"
            strokeWidth="48"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            filter="url(#glow)"
            opacity="0.95"
          >
            <animate 
              attributeName="stroke-width" 
              values="48;52;48" 
              dur="2s" 
              begin="1s"
              repeatCount="indefinite"
            />
          </path>
          
          {/* Center Connecting Link - The Heart of Connection */}
          <path
            d="M180 336 L332 184"
            stroke="url(#logoGradient)"
            strokeWidth="48"
            strokeLinecap="round"
            fill="none"
            filter="url(#glow)"
          >
            <animate 
              attributeName="opacity" 
              values="0.9;1;0.9" 
              dur="1.5s" 
              repeatCount="indefinite"
            />
          </path>
          
          {/* Energy Dots flowing along the chain */}
          <circle cx="256" cy="260" r="12" fill="#00c7b7" opacity="0.9">
            <animateMotion
              path="M-76,76 L76,-76"
              dur="2s"
              repeatCount="indefinite"
            />
            <animate 
              attributeName="opacity" 
              values="0;0.9;0" 
              dur="2s" 
              repeatCount="indefinite"
            />
          </circle>
          
          <circle cx="256" cy="260" r="12" fill="#a855f7" opacity="0.9">
            <animateMotion
              path="M-76,76 L76,-76"
              dur="2s"
              begin="1s"
              repeatCount="indefinite"
            />
            <animate 
              attributeName="opacity" 
              values="0;0.9;0" 
              dur="2s" 
              begin="1s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>
      
      {/* Logo Text - Bigger and Bolder */}
      {showText && (
        <span 
          className={`${textSizes[size]} font-extrabold bg-gradient-to-r from-primary-500 to-purple-600 bg-clip-text text-transparent inline-block whitespace-nowrap`}
        >
          CodeConnect
        </span>
      )}
    </Link>
  );
};

export default Logo;

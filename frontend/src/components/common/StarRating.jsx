import { useState } from 'react';
import { FiStar } from 'react-icons/fi';
import { motion } from 'framer-motion';

const StarRating = ({ 
  value = 0, 
  onChange = null, 
  readonly = false, 
  size = 'md',
  showCount = false,
  count = 0 
}) => {
  const [hoverValue, setHoverValue] = useState(0);

  const sizes = {
    sm: 'text-sm',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  const sizeClass = sizes[size] || sizes.md;

  const handleClick = (rating) => {
    if (!readonly && onChange) {
      onChange(rating);
    }
  };

  const handleMouseEnter = (rating) => {
    if (!readonly) {
      setHoverValue(rating);
    }
  };

  const handleMouseLeave = () => {
    setHoverValue(0);
  };

  const displayValue = hoverValue || value;

  return (
    <div className="flex items-center gap-1">
      <div 
        className="flex items-center gap-0.5"
        onMouseLeave={handleMouseLeave}
      >
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= displayValue;
          const isPartialFilled = star === Math.ceil(displayValue) && displayValue % 1 !== 0;
          
          return (
            <motion.button
              key={star}
              type="button"
              onClick={() => handleClick(star)}
              onMouseEnter={() => handleMouseEnter(star)}
              disabled={readonly}
              className={`
                ${sizeClass}
                ${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'}
                transition-all duration-200
                focus:outline-none
              `}
              whileHover={!readonly ? { scale: 1.1 } : {}}
              whileTap={!readonly ? { scale: 0.95 } : {}}
            >
              {isPartialFilled ? (
                <div className="relative inline-block">
                  <FiStar className="text-gray-300 dark:text-dark-600" />
                  <div 
                    className="absolute inset-0 overflow-hidden" 
                    style={{ width: `${(displayValue % 1) * 100}%` }}
                  >
                    <FiStar 
                      className="text-yellow-500" 
                      fill="currentColor" 
                    />
                  </div>
                </div>
              ) : (
                <FiStar
                  className={
                    isFilled
                      ? 'text-yellow-500'
                      : 'text-gray-300 dark:text-dark-600'
                  }
                  fill={isFilled ? 'currentColor' : 'none'}
                />
              )}
            </motion.button>
          );
        })}
      </div>
      
      {showCount && count > 0 && (
        <span className="text-sm text-gray-500 dark:text-dark-400 ml-2">
          ({count})
        </span>
      )}
    </div>
  );
};

export default StarRating;

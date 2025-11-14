const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-5 h-5',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  const sizeClass = sizes[size] || sizes.md;

  return (
    <div className={`spinner ${sizeClass} ${className}`} />
  );
};

export default LoadingSpinner;

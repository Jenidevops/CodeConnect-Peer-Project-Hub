const Textarea = ({ 
  label, 
  error, 
  rows = 4,
  className = '',
  ...props 
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-dark-200 mb-2">
          {label}
        </label>
      )}
      <textarea
        rows={rows}
        className={`textarea ${
          error ? 'border-red-500 focus:ring-red-500' : ''
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Textarea;

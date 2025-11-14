const Modal = ({ isOpen, onClose, title, children, maxWidth = 'md' }) => {
  if (!isOpen) return null;

  const maxWidths = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      onClick={onClose}
    >
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" />

        {/* Modal */}
        <div
          className={`relative inline-block ${maxWidths[maxWidth]} w-full card p-6 text-left align-middle transform transition-all animate-scale-in`}
          onClick={(e) => e.stopPropagation()}
        >
          {title && (
            <div className="mb-4 pb-4 border-b border-gray-200 dark:border-dark-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-dark-50">
                {title}
              </h3>
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;

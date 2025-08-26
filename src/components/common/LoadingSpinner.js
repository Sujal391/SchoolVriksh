// src/components/common/LoadingSpinner.js
const LoadingSpinner = ({ size = 'medium', fullPage = false }) => {
  const sizes = {
    small: 'h-5 w-5',
    medium: 'h-8 w-8',
    large: 'h-12 w-12',
  };

  if (fullPage) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        <div className={`animate-spin rounded-full ${sizes[size]} border-t-2 border-b-2 border-indigo-500`}></div>
      </div>
    );
  }

  return (
    <div className={`animate-spin rounded-full ${sizes[size]} border-t-2 border-b-2 border-indigo-500`}></div>
  );
};

export default LoadingSpinner;
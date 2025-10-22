import React from "react";

interface RefreshButtonProps {
  onRefresh: () => void;
  loading?: boolean;
  className?: string;
}

const RefreshButton: React.FC<RefreshButtonProps> = ({
  onRefresh,
  loading = false,
  className = "",
}) => {
  return (
    <button
      onClick={onRefresh}
      disabled={loading}
      className={`
        flex items-center justify-center px-4 py-2 rounded-lg bg-white dark:bg-gray-800 mx-4 my-1
        text-gray-900 dark:text-gray-200 border border-gray-400 dark:border-gray-600
        hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500
        ${loading ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      {loading ? (
        <svg
          className="animate-spin h-5 w-5 mr-2 text-gray-900 dark:text-gray-200"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      ) : null}
      Refresh
    </button>
  );
};

export default RefreshButton;

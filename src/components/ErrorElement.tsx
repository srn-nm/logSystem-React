import "../style.css";
import { useNavigate } from "react-router-dom";
import HomeFilledIcon from '@mui/icons-material/HomeFilled';

export default function ErrorElement() {
  const navigate = useNavigate();

  const handleGoToDashboard = () => {
    navigate("/dashboard"); 
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 direction-rtl p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl max-w-md w-full shadow-2xl border border-gray-300 dark:border-gray-600 ">
        
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
            <svg 
              className="w-10 h-10 text-red-500 dark:text-red-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" 
              />
            </svg>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
            خطا ۴۰۴
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-8">
            !صفحه‌ای که دنبال آن بودید پیدا نشد
          </p>
          
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleGoToDashboard}
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <HomeFilledIcon></HomeFilledIcon>
            صفحه اصلی
          </button>
        </div>
      </div>
    </div>
  );
}
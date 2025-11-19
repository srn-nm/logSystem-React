import "../style.css"

export default function ErrorElement() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 direction-rtl">
      <div className="bg-gray-200 dark:bg-gray-700 p-8 rounded-2xl max-w-[500px] w-full shadow-2xl">
        <div className="text-center text-2xl text-white/90">
          صفحه موردنظر در دسترس نمی باشد.
        </div>
      </div>
    </div>
  );
}
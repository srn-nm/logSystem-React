import "./ErrorElement.css"
import "../style.css"

export default function ErrorElement() {
  return (
    <div className="error-element bg-gray-100 dark:bg-gray-900">
        <div className="error-element-box bg-gray-200 dark:bg-gray-700">
            <div className="error-element-title">صفحه موردنظر در دسترس نمی باشد.</div>
        </div>
    </div>
  );
}
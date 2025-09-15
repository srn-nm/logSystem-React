import { motion } from "framer-motion";
import LoginForms from "../components/LoginForms";

export default function LoginPage() {


  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors rtl" style={{direction:"rtl"}}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/90 dark:bg-gray-800 p-10 rounded-2xl max-w-md w-full shadow-lg transition-colors"
      >
        <LoginForms></LoginForms>
      </motion.div>
    </div>
  );
}

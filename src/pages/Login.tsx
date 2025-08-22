import React, { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authType, setAuthType] = useState("QR");
  const [validationType, setValidationType] = useState("LDAP");
  const navigate = useNavigate();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    localStorage.setItem("isLoggedIn", "true");
    navigate("/");
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors rtl" style={{direction:"rtl"}}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/90 dark:bg-gray-800 p-10 rounded-2xl max-w-md w-full shadow-lg transition-colors"
      >
        <h1 className="text-center mb-6 t font-extrabold text-3xl text-gray-900 dark:text-gray-100 transition-colors">
          ورود کاربری
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="نام کاربری"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-base text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 focus:border-blue-500 outline-none transition-colors"
          />

          <input
            type="password"
            placeholder="گذرواژه"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-base text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 focus:border-blue-500 outline-none transition-colors"
          />

          <label className="text-gray-700 dark:text-gray-200 font-semibold mt-2">
            نوع ورود کاربری
          </label>
          <select
            value={authType}
            onChange={(e) => setAuthType(e.target.value)}
            className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-blue-500 outline-none transition-colors"
            style={{ fontFamily: "Vazirmatn" }}
          >
            <option value="QR">LDAP</option>
            <option value="MOBILE">نام کاربری و پسورد</option>
          </select>

          <label className="text-gray-700 dark:text-gray-200 font-semibold mt-2" style={{fontFamily: "Vazirmatn"}}>
            صحت سنجی
          </label>
          <select
            value={validationType}
            onChange={(e) => setValidationType(e.target.value)}
            className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-blue-500 outline-none transition-colors"
            style={{ fontFamily: "Vazirmatn" }}
          >
            <option value="LDAP">QR اسکن کد</option>
            <option value="USERPASS">موبایل</option>
          </select>

          <button
            type="submit"
            className="p-3 bg-blue-500 dark:bg-blue-600 text-white rounded-lg font-bold text-base hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors mt-4"
          >
            ورود
          </button>
        </form>
      </motion.div>
    </div>
  );
}

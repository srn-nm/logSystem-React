import { type AuthForm } from "./AuthFormType";

interface Props {
  authForm: AuthForm;
  setAuthForm: React.Dispatch<React.SetStateAction<AuthForm>>;
}

export default function LoginInputs({ authForm, setAuthForm }: Props) {
  return (
    <>
      <input
        type="username"
        value={authForm.username}
        placeholder="نام کاربری"
        onChange={(e) =>
          setAuthForm((f: any) => ({ ...f, username: e.target.value }))
        }
        className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-base text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 focus:border-blue-500 outline-none transition-colors"
      />

      <input
        type="password"
        value={authForm.password}
        placeholder="گذرواژه"
        onChange={(e) =>
          setAuthForm((f: any) => ({ ...f, password: e.target.value }))
        }
        className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-base text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 focus:border-blue-500 outline-none transition-colors"
      />

      <select
        value={authForm.authType}
        onChange={(e) =>
          setAuthForm((f: any) => ({
            ...f,
            authType: e.target.value as AuthForm["authType"]
          }))
        }
        className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-blue-500 outline-none transition-colors"
        style={{ fontFamily: "Vazirmatn" }}
      >
        <option value="USERPASS">نام کاربری و پسورد</option>
        <option value="LDAP">LDAP</option>
      </select>

      <select
        value={authForm.type}
        onChange={(e) =>
          setAuthForm((f: any) => ({
            ...f,
            type: e.target.value as AuthForm["type"]
          }))
        }
        className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-blue-500 outline-none transition-colors"
        style={{ fontFamily: "Vazirmatn" }}
      >
        <option value="MOBILE">موبایل</option>
        <option value="QR">QR اسکن کد</option>
      </select>
    </>
  );
}

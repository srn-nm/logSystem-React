import type { AuthForm } from "./AuthFormType";
import type { LoginInputsProps } from "./LoginInputs";

export default function LoginInputsAuthType({ authForm, setAuthForm }: LoginInputsProps) {
    return (
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
    );
}
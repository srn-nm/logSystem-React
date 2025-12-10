import type { LoginInputsProps } from "./LoginInputs";

export default function LoginInputsUsername({ authForm, setAuthForm }: LoginInputsProps) {
    return (
        <input
        type="username"
        value={authForm.username}
        placeholder="نام کاربری"
        onChange={(e) =>
          setAuthForm((f: any) => ({ ...f, username: e.target.value }))
        }
        className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-base text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 focus:border-blue-500 outline-none transition-colors"
      />
    );
}
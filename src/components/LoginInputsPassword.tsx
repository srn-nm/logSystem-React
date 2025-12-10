import type { LoginInputsProps } from "./LoginInputs";

export default function LoginInputsPassword({ authForm, setAuthForm }: LoginInputsProps) {
    return (
        <input
          type="password"
          value={authForm.password}
          placeholder="گذرواژه"
          onChange={(e) =>
            setAuthForm((f: any) => ({ ...f, password: e.target.value }))
          }
          className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-base text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 focus:border-blue-500 outline-none transition-colors"
        />
    );
}
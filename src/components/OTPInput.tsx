interface Props {
  code: string;
  setCode: (v: string) => void;
}

export default function OTPInput({ code, setCode }: Props) {
  return (
    <input
        type="text"
        maxLength={4}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-base text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 focus:border-blue-500 outline-none transition-colors text-center"
        placeholder="_ _ _ _"
    />
  );
}
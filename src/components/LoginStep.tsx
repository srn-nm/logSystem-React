import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import LoginInputs from "./LoginInputs";
import LoginSubmitButton from "./LoginSubmitButton";
import { type AuthForm } from "./AuthFormType";

interface Props {
  authForm: AuthForm;
  setAuthForm: React.Dispatch<React.SetStateAction<AuthForm>>;
  goToOtp: () => void;
}

export default function LoginStep({ authForm, setAuthForm, goToOtp }: Props) {
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    Cookies.set("session", "sample", { expires: 1 / 12 });
    navigate("/");

    try {
      const res = await axios.post(
        "http://172.16.20.173/api/v1/authentication/login/challenge",
        authForm
      );

      const challengeID = JSON.stringify(res.data);
      localStorage.setItem("ID", challengeID);
      await sendSMS(challengeID);
      goToOtp();
    } catch (err) {
      console.log(err);
    }
  }

  async function sendSMS(ID: string) {
    const url = `http://172.16.20.173/api/v1/authentication/login/challenge/${ID}/mobile`;
    await axios.post(url, { challengeID: ID });
  }

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <h1 className="text-center mb-6 t font-extrabold text-3xl text-gray-900 dark:text-gray-100 transition-colors">
          ورود کاربری
        </h1>
        <LoginInputs authForm={authForm} setAuthForm={setAuthForm} />
        <LoginSubmitButton />
    </form>
  );
}

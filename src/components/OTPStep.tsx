import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import OTPInput from "./OTPInput";
import OTPSubmitButton from "./OTPSubmitButton";
import type { NavigateFunction } from "react-router-dom";

interface Props {
  navigate: NavigateFunction;
}

export default function OTPStep({ navigate }: Props) {
  const [code, setCode] = useState("");

  async function handleOTP(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const ID = localStorage.getItem("ID");
    if (!ID) return console.error("No challenge ID found!");

    await axios.post("http://172.16.20.173/api/v1/authentication/login/challenge/${ID}/mobile/verify", {
      verificationCode: code,
      challengeID: ID
    });

    const token = await getAccessToken();
    if (token) {
        Cookies.set("session", token, { expires: 1 / 12 });
    }

    navigate("/");
  }

  async function getAccessToken(): Promise<string | null> {
    try {
        const res = await axios.post(`http://172.16.20.173/api/v1/authentication/login/access-token`,
            JSON.stringify({}),
            {
                headers: {
                'Content-Type': 'application/json'
                }
            }
        )      
        return res.data;
    } catch(error: any) {
          console.log("Catched error in SMS verification: " + error.message)
          return null;
    }
  }

  return (
    <form onSubmit={handleOTP} className="flex flex-col gap-4">
        <h1 className="text-center mb-6 t font-extrabold text-xl text-gray-900 dark:text-gray-100 transition-colors">کد پیامکی را وارد کنید</h1>
        <OTPInput code={code} setCode={setCode} />
        <OTPSubmitButton />
    </form>
  );
}
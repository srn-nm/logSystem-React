import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import LoginStep from "./LoginStep"
import OTPStep from "./OTPStep";
import { type AuthForm } from "./AuthFormType";
import { useCallback } from "react";

export default function LoginForms() {

  Cookies.remove("session");
  const navigate = useNavigate();

  const [authForm, setAuthForm] = useState<AuthForm>({
    username: "",
    password: "",
    authType: "USERPASS",
    type: "MOBILE"
  });

  const goToOtp = useCallback(() => setStep("otp"), []);
  const [step, setStep] = useState<"login" | "otp">("login")

  var data = new FormData();
  data.append("json", JSON.stringify( authForm ));

  return (
    <>
    {step === "login" && (
      <LoginStep 
      authForm={authForm} 
      setAuthForm={setAuthForm}
      goToOtp={goToOtp}
      >
      </LoginStep>
    )}

    {step === "otp" && (
      <OTPStep 
      navigate={navigate} 
      />
    )}

    </>
  );
}
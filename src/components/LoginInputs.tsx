import type { AuthForm } from "./AuthFormType";
import LoginInputsUsername from "./LoginInputsUsername";
import LoginInputsPassword from "./LoginInputsPassword";
import LoginInputsAuthType from "./LoginInputsPasswordAuthType";
import LoginInputsType from "./LoginInputsPasswordType";

export interface LoginInputsProps {
  authForm: AuthForm;
  setAuthForm: React.Dispatch<React.SetStateAction<AuthForm>>;
}

export default function LoginInputs({ authForm, setAuthForm }: LoginInputsProps) {
  return (
    <>
      <LoginInputsUsername authForm={authForm} setAuthForm={setAuthForm}></LoginInputsUsername>
      <LoginInputsPassword authForm={authForm} setAuthForm={setAuthForm}></LoginInputsPassword>
      <LoginInputsAuthType authForm={authForm} setAuthForm={setAuthForm}></LoginInputsAuthType>
      <LoginInputsType authForm={authForm} setAuthForm={setAuthForm}></LoginInputsType>
    </>
  );
}

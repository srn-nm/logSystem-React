import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
// import type { FormEvent } from "react";
// import { useNavigate } from "react-router-dom";

export default function LoginForms() {

  const navigate = useNavigate();

  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [authType, setAuthType] = useState("")
  const [type, setType] = useState("") 
  const [authenticationCode, setAuthenticationCode] = useState("")

  const [step, setStep] = useState<"login" | "otp">("login")

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const dataSending = {
            username: userName,
            password: password,
            type: type,
            authType: authType
          }

    console.log(dataSending)

    try { //"http://172.16.20.173/api/v1/authentication/login/challenge"
      const response = await fetch("http://localhost:4000/challenge", {
        method: "POST",
        headers: {
                "Content-Type": "application/json",
                // "credentials": "include"
            },
            body: JSON.stringify(dataSending),
      });

      if (!response.ok) {
        throw new Error(`error : ${response.statusText}`);
      }

      // const responseData = await response.json();
      // setID(responseData.id)
      // setID(responseData)
      const data = await response.text();
      
      //vaghti jaygozin beshe in ba server asli lotfan in 2 khat delete va 3 khate balash az comment dar biad
      localStorage.setItem("ID", data);
      console.log("data(id): "+ localStorage.getItem("ID"))
      
      send_sms_to_mobile();

      setStep("otp");
      console.log("going to otp step...")

    } catch (error: any) {
      console.log("error: ", error.message);
    }
  }

  async function send_sms_to_mobile() {   
    console.log("entered send sms to mobile.")

    if (!localStorage.getItem("ID")) {
              console.error("No challenge ID found!");
              return;
      }

    try {
        console.log("Global:" + localStorage.getItem("ID")) 

        //"http://172.16.20.173/api/v1/authentication/login/challenge/{localStorage.getItem("ID")}/mobile"
        let apiURL = "http://localhost:4000/send_sms_to_mobile"
        const response = await fetch (apiURL , {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                challengeID: localStorage.getItem("ID")
            })
        })

        console.log("Request to Local Server send_sms_to_mobile was sent successfully.")

        if (response.status == 200) {
            console.log("SMS sent successfully.")
            
        } else {
            console.log("SMS wasnt sent successfully.")
            const error = await response.text();
            console.log("Error " + response.status + " " + error )    
            return;
        }
        
    } catch (error: any) {        
        console.log("Catched error: " + error)
    }
  }

  async function handleOTP(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

      if (!localStorage.getItem("ID")) {
              console.error("No challenge ID found!");
              return;
      }
      try {//"http://172.16.20.173/api/v1/authentication/login/challenge/${ID}/mobile/verify"
          const apiURL = `http://localhost:4000/handle_SMS_verification`;
          const response = await fetch(apiURL, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({
                  verificationCode: authenticationCode,
                  challengeID: localStorage.getItem("ID")
              })
          })

          if (!response.ok) {
              let responseBody = await response.text()
              console.log(responseBody);  
          } else {
              // const data = await response.json(); // ba in data chi kar konim??
              // console.log(data);
              localStorage.setItem("isLoggedIn", "true");
              
              navigate("/"); 
          }
      } catch(error: any) {
          console.log("Catched error in SMS verification: " + error.message)
      }
  }

  return (
    <>
    {step === "login" && (
      <>
        <h1 className="text-center mb-6 t font-extrabold text-3xl text-gray-900 dark:text-gray-100 transition-colors">
          ورود کاربری
        </h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="نام کاربری"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
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
            value={type}
            onChange={(e) => setType(e.target.value)}
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
      </>
    )}
    {step === "otp" && (
    <>
      <h1 className="text-center mb-6 t font-extrabold text-xl text-gray-900 dark:text-gray-100 transition-colors">
          کد اس ام اس شده را وارد نمایید.
        </h1>
        <form onSubmit={handleOTP} className="flex flex-col gap-4">
          <input

            type="text"
            maxLength= {4}
            placeholder="_ _ _ _‍"
            value={authenticationCode}
            onChange={(e) => setAuthenticationCode(e.target.value)}
            className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-base text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 focus:border-blue-500 outline-none transition-colors text-center"
          />

          <button
            type="submit"
            className="p-3 bg-blue-500 dark:bg-blue-600 text-white rounded-lg font-bold text-base hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors "
          >
            تایید
          </button>
        </form>
     
    </>
    )}
    </>
  );
}
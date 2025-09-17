import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from "axios";


type AuthForm = {username : string , password: string , authType: "USERPASS" | "LDAP" , type : "MOBILE" | "QR"}
export default function LoginForms() {
  Cookies.remove("session");

  const navigate = useNavigate();


  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [authType, setAuthType] = useState("")
  const [type, setType] = useState("") 
  const [authenticationCode, setAuthenticationCode] = useState("")

  const [step, setStep] = useState<"login" | "otp">("login")

  const dataSending = {
    "username": userName,
    "password": password,
    "authType": authType,
    "type": type
  }

  var payload = {
    "username": userName,
    "password": password,
    "authType": authType,
    "type": type
  };
  var data = new FormData();
  data.append( "json", JSON.stringify( payload ) );

  const [authForm , setAuthForm]  = useState<AuthForm>()

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  
    try { 
      const response = await axios.get("http://172.16.20.173/api/v1/health",
        {
          headers: {
            "Content-Type":"application/json"
          },
          withCredentials: true
        }
      )

      const responseData =  JSON.stringify(response)
      
      console.log(response)

      // lets see if it works until here or not

      localStorage.setItem("ID", responseData);
      console.log("data(id): "+ localStorage.getItem("ID"))
      
      send_sms_to_mobile();

      setStep("otp");
      console.log("going to otp step...")

    } catch (error: any) {
      console.log("error: ", error);
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

        let apiURL = "http://172.16.20.173/api/v1/authentication/login/challenge/{localStorage.getItem(\"ID\")}/mobile"
        console.log(apiURL)
        const response = await fetch (apiURL , {
            method: "POST",
            headers: {
              "credentials":"include"
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

  async function getAccessToken() {
      if (!localStorage.getItem("ID")) {
              console.error("No challenge ID found!");
              return;
      }
      try {//`http://172.16.20.173/api/v1/authentication/login/access-token`
          const apiURL = `http://localhost:4000//get_access_token`;
          const response = await fetch(apiURL, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({})
          })

          if (!response.ok) {
              let responseBody = await response.text()
              console.log(responseBody);  
              return null;
          } else {
              const token = await response.json();
              console.log(token);
              return token;              
          }
      } catch(error: any) {
          console.log("Catched error in SMS verification: " + error.message)
          return null;
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
              try {
                Cookies.set("session", await getAccessToken(), { expires: 1 / 12 }); // 2 hours
              } catch(error: any) {
                console.log("Couldn't get access token. " + error.message)
              }
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
        <form onSubmit={handleLogin} className="flex flex-col gap-4" >
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
          className="p-3 bg-blue-500 dark:bg-blue-600 text-white rounded-lg font-bold text-base 
                    hover:bg-blue-600 dark:hover:bg-blue-700 
                    active:scale-95 active:bg-blue-700 dark:active:bg-blue-800 
                    transition-all duration-150 ease-in-out mt-4"
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
            className="p-3 bg-blue-500 dark:bg-blue-600 text-white rounded-lg font-bold text-base 
                    hover:bg-blue-600 dark:hover:bg-blue-700 
                    active:scale-95 active:bg-blue-700 dark:active:bg-blue-800 
                    transition-all duration-150 ease-in-out mt-4"
          >
            تایید
          </button>
        </form>
    </>
    )}
    </>
  );
}
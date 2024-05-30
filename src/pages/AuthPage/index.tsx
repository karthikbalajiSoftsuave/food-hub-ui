import { useState } from "react";
import "./styles.scss";
import SignUpForm from "./SignUpPage";
import SignInForm from "./SignInPage";

const AuthPage = () => {
  const [type, setType] = useState("signIn");
  const containerClass = "container " + (type === "signUp" ? "right-panel-active" : "");

  const handleOnClick = (text: string) => {
    if (text !== type) {
      setType(text);
      return;
    }
  };

  return (
    <div className="AuthPage">
      <div className={containerClass} id="container">
        <SignUpForm setType={setType} />
        <SignInForm />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p className="text-info">
                To keep connected with us please login
              </p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, cook!</h1>
              <p className="text-info">Enter your details and start journey with Food Recipes</p>
              <button
                className="ghost "
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default AuthPage;
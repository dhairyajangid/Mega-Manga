import { useState } from "react";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";

const AuthContainer = () => {
  const [isSignin, setIsSignin] = useState(true);

  return (
    <div className="relative z-10 flex justify-center items-center h-full">
      {isSignin ? (
        <SigninForm switchToSignup={() => setIsSignin(false)} />
      ) : (
        <SignupForm switchToSignin={() => setIsSignin(true)} />
      )}
    </div>
  );
};

export default AuthContainer;

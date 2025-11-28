import AuthBackground from "../components/authComponent/AuthBackground";
import AuthContainer from "../components/authComponent/AuthContainer";

export default function AuthPage() {
  return (
    <div className="relative w-full h-screen">
      <AuthBackground />
      <AuthContainer />
    </div>
  );
}

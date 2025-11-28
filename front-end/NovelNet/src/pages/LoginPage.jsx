import React, { useState, useEffect } from "react";
import { IKImage } from "imagekitio-react";
import AuthForm from "../components/AuthForm";

const bgImages = [
  "/novel-bg1.jpg",
  "/novel-bg2.jpg",
  "/novel-bg3.jpg",
  "/novel-bg4.jpg",
]; // paths from ImageKit

const AuthPage = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % bgImages.length);
    }, 5000); // every 5 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden flex items-center justify-center">
      {/* Background image */}
      <IKImage
        key={current}
        path={bgImages[current]}
        transformation={[{ height: 1080, width: 1920 }]}
        loading="lazy"
        lqip={{ active: true }}
        className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* Foreground auth box */}
      <div className="relative z-10 w-[90%] sm:w-[400px] bg-white/90 rounded-2xl shadow-2xl p-8">
        <AuthForm />
      </div>
    </div>
  );
};

export default AuthPage;

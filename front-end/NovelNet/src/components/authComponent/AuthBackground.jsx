import { useState, useEffect } from "react";
import { authImages } from "../../data/authImages";

export default function AuthBackground() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const changeImage = () => {
      // trigger fade-out
      setFade(true);

      // wait for fade animation to finish, then switch image
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % authImages.length);
        setFade(false); // fade-in back
      }, 700); // matches CSS duration
    };

    const interval = setInterval(changeImage, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden">
      {/* Background image with fade animation */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
          fade ? "opacity-0" : "opacity-100"
        }`}
        style={{
          backgroundImage: `url(${authImages[index]})`,
        }}
      ></div>
    </div>
  );
}

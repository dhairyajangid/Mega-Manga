import { useState, useEffect } from "react";
import { authImages } from "../../data/authImages";

export default function AuthBackground() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setNextIndex((prev) => (prev + 1) % authImages.length);
      
      // Delay the current index update to create crossfade
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % authImages.length);
      }, 1000); // Half of transition duration
      
    }, 6000); // Change image every 6 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden">
      {/* Static dark overlay for better text readability - doesn't animate */}
      <div className="absolute inset-0 bg-black/40 z-[5] pointer-events-none"></div>
      
      {/* Bottom layer - Current image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-[1]"
        style={{
          backgroundImage: `url(${authImages[currentIndex]})`,
        }}
      ></div>

      {/* Top layer - Next image that fades in */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-[3000ms] ease-in-out z-[2]"
        style={{
          backgroundImage: `url(${authImages[nextIndex]})`,
          opacity: nextIndex !== (currentIndex + 1) % authImages.length ? 1 : 0,
        }}
      ></div>
    </div>
  );
}
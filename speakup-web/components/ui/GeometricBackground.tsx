"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function GeometricBackground() {
  const [yOffset, setYOffset] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detecta si es móvil
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleScroll = () => {
      if (!isMobile) {
        setYOffset(window.scrollY * -0.2);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div
        className="absolute w-full top-0"
        style={{
          transform: isMobile ? "translateY(0)" : `translateY(${yOffset}px)`,
          transition: "transform 0.1s linear",
        }}
      >
        <Image
          src="/background.svg"
          alt=""
          width={1920}
          height={1080}
          priority
          className="w-full h-screen object-cover md:h-auto md:object-contain block"
        />
        {/* Overlay para blur y desaturación */}
        <div className="absolute inset-0 bg-gray-medium/15 backdrop-blur-sm"></div>
      </div>
    </div>
  );
}

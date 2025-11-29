import React, { useState, useEffect } from "react";

export default function HeroSection() {
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative flex flex-col items-center text-center py-40 px-6 overflow-hidden">
      {cursorPos && (
        <div
          className="pointer-events-none fixed w-6 h-6 rounded-full bg-primary/50 blur-xl transition-transform duration-150"
          style={{
            left: cursorPos.x - 12,
            top: cursorPos.y - 12,
          }}
        ></div>
      )}

      <h2 className="text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 text-primary dark:text-primary drop-shadow-lg">
        Анализ тональности текста
      </h2>

      <p className="text-xl lg:text-2xl text-text/80 dark:text-text/70 leading-relaxed max-w-3xl">
        Автоматический анализ сообщений горожан с использованием современных алгоритмов для глубокого понимания их настроений.
      </p>
    </section>
  );
}

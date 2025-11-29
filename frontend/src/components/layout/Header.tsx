import React, { useState } from "react";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

interface Props {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export default function Header({ theme, toggleTheme }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { id: "analysis", label: "Анализ", path: "/" },
    { id: "how-it-works", label: "Как это работает", path: "/how-it-works" },
  ];

  return (
    <header
      className="w-full sticky top-0 z-50 backdrop-blur-xl shadow-xl rounded-b-3xl transition-colors duration-500"
      style={{
        backgroundColor:
          theme === "light" ? "rgba(255, 255, 255, 0.2)" : "rgba(0,0,0,0.4)",
      }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6 lg:px-12">
        <h1
          className="text-2xl font-bold cursor-pointer"
          style={{ color: "var(--primary)" }}
        >
          <Link to="/">Анализ тональности</Link>
        </h1>

        {/* ПК навигация */}
        <nav className="hidden lg:flex gap-8 items-center font-medium text-lg relative">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <div key={item.id} className="relative">
                <Link
                  to={item.path}
                  className={`hover:text-[var(--accent)] transition-colors ${
                    isActive ? "text-[var(--accent)]" : "text-[var(--text)]"
                  }`}
                >
                  {item.label}
                </Link>
                {isActive && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 bottom-0 w-full h-1 bg-[var(--accent)] rounded"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </div>
            );
          })}
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </nav>

        {/* Бургер */}
        <div className="lg:hidden flex items-center gap-4">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <button
            className="flex flex-col justify-center items-center w-8 h-8 gap-1"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span
              className={`block h-1 w-full bg-[var(--text)] rounded transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block h-1 w-full bg-[var(--text)] rounded transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-1 w-full bg-[var(--text)] rounded transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Бургер меню */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden bg-[var(--background)] dark:bg-black/80 shadow-xl"
          >
            <nav className="flex flex-col gap-4 p-6">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className="text-[var(--text)] dark:text-white font-medium hover:text-[var(--accent)] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

import React from "react";

interface Props {
    theme: "light" | "dark";
    toggleTheme: () => void;
}

const ThemeToggle: React.FC<Props> = ({ theme, toggleTheme }) => {
    return (
        <button
            onClick={toggleTheme}
            aria-label="Переключить тему"
            className="ml-4 p-2 rounded-full border border-[var(--secondary)] hover:bg-[var(--secondary)]/10 transition"
            style={{
                color: "var(--text)",
                backgroundColor: "var(--background)",
            }}
        >
            {theme === "light" ? (
                <span role="img" aria-label="Луна">
          🌙
        </span>
            ) : (
                <span role="img" aria-label="Солнце">
          ☀️
        </span>
            )}
        </button>
    );
};

export default ThemeToggle;

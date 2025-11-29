import React from "react";
import { FaInstagram, FaTelegram, FaGithub } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="w-full py-8 flex flex-col items-center justify-center backdrop-blur-md bg-white/10 border-t border-white/20 shadow-inner">
            <p className="text-sm text-[var(--text)]/70 mb-2">
                © {new Date().getFullYear()} Sentiment ML
            </p>
            <div className="flex gap-4 mb-3 text-[var(--text)]/60 text-xs">
                <a href="/about" className="hover:text-[var(--primary)] transition-colors">О нас</a>
                <a href="/terms" className="hover:text-[var(--primary)] transition-colors">Правила</a>
                <a href="/contact" className="hover:text-[var(--primary)] transition-colors">Контакты</a>
            </div>

        </footer>
    );
}

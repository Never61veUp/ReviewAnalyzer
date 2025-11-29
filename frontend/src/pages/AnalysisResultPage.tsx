import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GroupResponse } from "../api/client";

import NeonRingProgress from "../components/PositivePercentage";
import SatisfactionLine from "../components/SatisfactionLine";
import ToneChart from "../components/ToneChart";

export default function AnalysisResultPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showFilters, setShowFilters] = useState<boolean>(false);

  const state = location.state as { data?: GroupResponse; file?: File } | undefined;
  const data = state?.data;
  const file = state?.file || null;

  if (!data) {
    return (
      <div className="p-8 max-w-7xl mx-auto text-center text-[var(--text)]">
        <h1 className="text-3xl font-bold mb-4">Нет данных для отображения</h1>
        <p>Пожалуйста, вернитесь на главную страницу и выполните анализ.</p>

        <button
          className="mt-4 px-6 py-3 rounded-xl bg-[var(--primary)] text-white font-semibold"
          onClick={() => navigate("/")}
        >
          На главную
        </button>
      </div>
    );
  }

  const reviewsFlattened = data.result.groups.flatMap((g) =>
    g.reviews.flatMap((r) =>
      r.text.split("\n").map((single) => ({
        ...r,
        text: single.trim(),
        group: g.name,
      }))
    )
  );

  // Статистика
  const total = reviewsFlattened.length;
  const positive = reviewsFlattened.filter((r) => r.label === "positive").length;
  const negative = reviewsFlattened.filter((r) => r.label === "negative").length;
  const neutral = reviewsFlattened.filter((r) => r.label === "neutral").length;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 text-[var(--text)]">

      <h1 className="text-3xl font-bold text-center">Результаты анализа</h1>

      <section className="space-y-8 p-8 rounded-3xl backdrop-blur-2xl bg-white/10 border border-white/20 shadow-xl">

        <h2 className="text-2xl font-semibold">Общая информация</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl bg-white/5 border border-white/20 text-center">
            <p className="text-sm opacity-70">Всего отзывов</p>
            <p className="text-2xl font-semibold">{total}</p>
          </div>

          <div className="p-5 rounded-2xl bg-green-500/10 border border-green-400/20 text-center">
            <p className="text-sm opacity-70">Позитивных</p>
            <p className="text-2xl font-semibold text-green-400">{positive}</p>
          </div>

          <div className="p-5 rounded-2xl bg-red-500/10 border border-red-400/20 text-center">
            <p className="text-sm opacity-70">Негативных</p>
            <p className="text-2xl font-semibold text-red-400">{negative}</p>
          </div>

          <div className="p-5 rounded-2xl bg-yellow-500/10 border border-yellow-400/20 text-center">
            <p className="text-sm opacity-70">Нейтральных</p>
            <p className="text-2xl font-semibold text-yellow-400">{neutral}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <NeonRingProgress file={file} />
          <SatisfactionLine file={file} />
        </div>

        <div className="p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/20 shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-center">График тональности</h2>
          <ToneChart />
        </div>
      </section>

      {/* Отзывы */}
      <section className="space-y-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Отзывы</h2>

          <div className="flex items-center gap-2">
            <button className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-sm hover:bg-white/20 transition">
              Сбросить фильтры
            </button>

            <button className="px-5 py-2 rounded-xl bg-[var(--primary)] text-white font-medium hover:opacity-90 transition flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l8 8 8-8M12 4v20" />
              </svg>
              Скачать CSV
            </button>
          </div>
        </div>

        {/* поиск + фильтры */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Поиск по словам..."
            className="flex-1 px-4 py-2 rounded-xl bg-white/10 border border-white/20 backdrop-blur-xl outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
          />

          <div className="relative">
            <button
              className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-sm hover:bg-white/20 transition flex items-center gap-2"
              onClick={() => setShowFilters(prev => !prev)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 13.414V20a1 1 0 01-1.447.894l-4-2A1 1 0 019 18v-4.586L3.293 6.707A1 1 0 013 6V4z" />
              </svg>
              Фильтры
            </button>

            {/* окно фильтров */}
            {showFilters && (
              <div className="absolute right-0 mt-2 w-60 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 space-y-3 z-50">
                <div>
                  <label className="text-sm font-medium">Тональность</label>
                  <select className="w-full mt-1 px-2 py-1 rounded-lg bg-white/10 border border-white/20 outline-none">
                    <option value="">Все</option>
                    <option value="positive">Позитивные</option>
                    <option value="negative">Негативные</option>
                    <option value="neutral">Нейтральные</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium">Доверие</label>
                  <select className="w-full mt-1 px-2 py-1 rounded-lg bg-white/10 border border-white/20 outline-none">
                    <option value="">Все</option>
                    <option value="high">Высокое</option>
                    <option value="medium">Среднее</option>
                    <option value="low">Низкое</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium">Дата</label>
                  <input type="date" className="w-full mt-1 px-2 py-1 rounded-lg bg-white/10 border border-white/20 outline-none" />
                </div>

                <div>
                  <label className="text-sm font-medium">Группа</label>
                  <input type="text" placeholder="По группе..." className="w-full mt-1 px-2 py-1 rounded-lg bg-white/10 border border-white/20 outline-none" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* отзывы */}
        <div className="space-y-6">
          {reviewsFlattened.map((review, index) => (
            <div key={review.id + review.text}>
              <div className="p-5 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow overflow-hidden break-words">
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      review.label === "positive"
                        ? "bg-green-500/20 text-green-400"
                        : review.label === "negative"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {review.label === "positive" ? "Позитивный" : review.label === "negative" ? "Негативный" : "Нейтральный"}
                  </span>

                  <span className="text-sm opacity-70">Доверие: {(review.confidence * 100).toFixed(1)}%</span>
                </div>

                <p className="text-base leading-relaxed whitespace-pre-line">{review.text}</p>
              </div>

              {index < reviewsFlattened.length - 1 && <div className="h-px bg-white/10 my-4"></div>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// // src/components/HistorySection.tsx
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { fetchGroups } from "../api/groups";

// // Тип отзыва согласно новому API
// interface Review {
//   id: string;
//   text: string;
//   label: "positive" | "neutral" | "negative";
//   confidence: number; // уверенность
// }

// // Тип группы
// interface Group {
//   id: string;
//   name: string;
//   date: string;
//   generalScore: number;
//   reviews: Review[];
// }

// const HistorySection: React.FC = () => {
//   const navigate = useNavigate();
//   const [reviews, setReviews] = useState<Review[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadReviews = async () => {
//       try {
//         const data = await fetchGroups();
//         // Берем последние 5 отзывов из первой группы
//         const latest: Review[] = data.result.groups[0]?.reviews.slice(0, 5) || [];
//         setReviews(latest);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadReviews();
//   }, []);

//   const handleViewAll = () => {
//     navigate("/feedback");
//   };

//   if (loading) return <div>Загрузка отзывов...</div>;

//   return (
//     <section className="flex flex-col items-center py-16 px-6 gap-8 w-full max-w-4xl mx-auto">
//       <h3 className="text-xl font-semibold mb-6" style={{ color: "var(--primary)" }}>
//         Последние отзывы
//       </h3>

//       <div className="w-full flex flex-col gap-2">
//         {reviews.map((fb, index) => (
//           <div
//             key={fb.id}
//             className={`p-4 rounded-2xl backdrop-blur-xl bg-white/20 dark:bg-black/10
//                         border border-white/20 dark:border-white/10
//                         shadow-lg hover:shadow-xl transition
//                         ${index < reviews.length - 1 ? "border-b" : ""}`}
//           >
//             <div className="flex justify-between items-center mb-2">
//               <span className="font-semibold text-[var(--text)] capitalize">{fb.label}</span>
//               <span className="text-xs text-[var(--text)]/60">
//                 Уверенность: {(fb.confidence * 100).toFixed(0)}%
//               </span>
//             </div>
//             <p className="text-[var(--text)]">{fb.text}</p>
//           </div>
//         ))}
//       </div>

//       <button
//         onClick={handleViewAll}
//         className="mt-6 px-6 py-2 rounded-xl bg-[var(--primary)] text-white font-semibold
//                    hover:bg-[var(--accent)] transition"
//       >
//         Посмотреть все отзывы
//       </button>
//     </section>
//   );
// };

// export default HistorySection;

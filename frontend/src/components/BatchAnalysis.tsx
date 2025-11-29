// // src/components/BatchAnalysis.tsx
// import React, { useState } from "react";
// import { Upload, FileText } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { uploadText } from "../api/groups";
// import { GroupResponse, Review } from "../api/client";

// interface Props {
//   file: File | null;
//   setFile: (file: File | null) => void;
// }

// export default function BatchAnalysis({ file, setFile }: Props) {
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [isUploading, setIsUploading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const navigate = useNavigate();

//   const handleAnalyze = async () => {
//     if (!file) {
//       setError("Выберите CSV-файл для анализа");
//       return;
//     }

//     setIsUploading(true);
//     setUploadProgress(0);
//     setError(null);

//     const interval = setInterval(() => {
//       setUploadProgress((prev) => Math.min(prev + 10, 90));
//     }, 100);

//     try {
//       const textFromFile = await file.text();

//       // Вызываем API
//       const reviewResult: Review | Review[] = await uploadText(textFromFile);

//       if (!reviewResult || (Array.isArray(reviewResult) && reviewResult.length === 0)) {
//         throw new Error("Нет отзывов для анализа");
//       }

//       clearInterval(interval);
//       setUploadProgress(100);

//       const reviewsArray: Review[] = Array.isArray(reviewResult) ? reviewResult : [reviewResult];
//       const positiveCount = reviewsArray.filter((r) => r.label === "positive").length;

//       const groupResponse: GroupResponse = {
//         result: {
//           groups: [
//             {
//               id: crypto.randomUUID(),
//               name: "Анализ CSV",
//               date: new Date().toISOString(),
//               generalScore:
//                 reviewsArray.reduce((sum, r) => sum + r.confidence, 0) / reviewsArray.length,
//               reviews: reviewsArray,
//             },
//           ],
//           percentagePositiveReview: Math.round((positiveCount / reviewsArray.length) * 100),
//         },
//         errorMessage: null,
//         timeGenerated: new Date().toISOString(),
//       };

//       // Переход на страницу с результатом анализа
//       navigate("/analysis-result", { state: { data: groupResponse } });
//     } catch (err: any) {
//       console.error(err);
//       setError(err.message || "Ошибка при анализе файла");
//       setUploadProgress(0);
//       clearInterval(interval);
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <div className="w-full max-w-7xl mx-auto space-y-6 p-8 rounded-3xl bg-[var(--background)]/40 border border-[var(--border)] shadow-[0_0_35px_var(--accent)/15] backdrop-blur-xl">
//       {/* Upload Area */}
//       <label
//         className={`flex flex-col items-center justify-center w-full p-12 rounded-2xl border-2 border-dashed border-[var(--border)]/40 cursor-pointer hover:shadow-[0_0_15px_var(--accent)] hover:bg-[var(--accent)]/5 transition-all ${
//           isUploading ? "opacity-60 pointer-events-none" : ""
//         }`}
//       >
//         <Upload className="w-16 h-16 text-[var(--accent)] transition-transform" />
//         <p className="mt-4 text-lg opacity-80 text-[var(--text)]">
//           Перетащите CSV-файл сюда или нажмите для выбора
//         </p>
//         <input
//           type="file"
//           accept=".csv"
//           onChange={(e) => setFile(e.target.files?.[0] ?? null)}
//           className="hidden"
//         />
//       </label>

//       {/* File Preview */}
//       {file && (
//         <div className="flex items-center gap-4 p-5 rounded-2xl bg-[var(--secondary)]/10 border border-[var(--border)]/40">
//           <FileText className="w-6 h-6 text-[var(--accent)]" />
//           <span className="text-sm text-[var(--text)] font-medium">{file.name}</span>
//         </div>
//       )}

//       {/* Supported Formats */}
//       <div className="text-sm text-[var(--text)]/70 italic">
//         Поддерживаемый формат: <b>CSV</b> — должен содержать столбец <b>text</b>.
//       </div>

//       {/* Analyze Button */}
//       <button
//         onClick={handleAnalyze}
//         disabled={isUploading || !file}
//         className={`w-full py-5 rounded-2xl text-lg font-semibold tracking-wide bg-[var(--primary)] text-white shadow-[0_0_22px_var(--primary)/60] hover:shadow-[0_0_35px_var(--primary)/80] hover:-translate-y-1 transition-all active:translate-y-1 active:shadow-[0_0_15px_var(--primary)/40] ${
//           isUploading ? "opacity-70 cursor-not-allowed" : ""
//         }`}
//       >
//         {isUploading ? `Загрузка... ${uploadProgress}%` : "Запустить анализ"}
//       </button>

//       {/* Progress Bar */}
//       {isUploading && (
//         <div className="w-full bg-[var(--secondary)]/20 rounded-2xl overflow-hidden h-5 mt-3">
//           <div
//             className="h-full rounded-2xl transition-all duration-100"
//             style={{
//               width: `${uploadProgress}%`,
//               background: "linear-gradient(90deg, #e74c3c, #f1c40f, #27ae60)",
//             }}
//           ></div>
//         </div>
//       )}

//       {/* Error */}
//       {error && <p className="text-red-500 mt-3 text-center">{error}</p>}
//     </div>
//   );
// }


import React, { useState } from "react";
import { Upload, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Review {
  id: string;
  text: string;
  label: "positive" | "neutral" | "negative";
  confidence: number;
}

interface Group {
  id: string;
  name: string;
  date: string;
  generalScore: number;
  reviews: Review[];
}

interface GroupResponse {
  result: {
    groups: Group[];
    percentagePositiveReview: number;
  };
  errorMessage: string | null;
  timeGenerated: string;
}

interface Props {
  file: File | null;
  setFile: (file: File | null) => void;
}

// МОК
async function uploadTextMock(text: string): Promise<Review[]> {

  await new Promise((res) => setTimeout(res, 1000));

  return [
    { id: "1", text: text, label: "positive", confidence: 0.85 },
    { id: "2", text: "Пример негативного отзыва", label: "negative", confidence: 0.7 },
    { id: "3", text: "Нейтральный отзыв", label: "neutral", confidence: 0.6 },
  ];
}

export default function BatchAnalysis({ file, setFile }: Props) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleAnalyze = async () => {
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);
    setError(null);

    try {
      const interval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90));
      }, 100);

      const textFromFile = await file.text();

      const reviewResult: Review[] = await uploadTextMock(textFromFile);

      clearInterval(interval);
      setUploadProgress(100);

      const positiveCount = reviewResult.filter(r => r.label === "positive").length;

      const groupResponse: GroupResponse = {
        result: {
          groups: [
            {
              id: crypto.randomUUID(),
              name: "Анализ CSV",
              date: new Date().toISOString(),
              generalScore: reviewResult.length
                ? reviewResult.reduce((sum, r) => sum + r.confidence, 0) / reviewResult.length
                : 0,
              reviews: reviewResult,
            },
          ],
          percentagePositiveReview: reviewResult.length
            ? Math.round((positiveCount / reviewResult.length) * 100)
            : 0,
        },
        errorMessage: null,
        timeGenerated: new Date().toISOString(),
      };

      navigate("/analysis-result", { state: { data: groupResponse } });

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Ошибка при анализе");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 p-8 rounded-3xl bg-[var(--background)]/40 border border-[var(--border)] shadow-[0_0_35px_var(--accent)/15] backdrop-blur-xl">

      <label
        className={`flex flex-col items-center justify-center w-full p-12 rounded-2xl border-2 border-dashed border-[var(--border)]/40 cursor-pointer hover:shadow-[0_0_15px_var(--accent)] hover:bg-[var(--accent)]/5 transition-all ${isUploading ? 'opacity-60 pointer-events-none' : ''}`}
      >
        <Upload className="w-16 h-16 text-[var(--accent)] transition-transform" />
        <p className="mt-4 text-lg opacity-80 text-[var(--text)]">
          Перетащите CSV-файл сюда или нажмите для выбора
        </p>
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="hidden"
        />
      </label>

      {file && (
        <div className="flex items-center gap-4 p-5 rounded-2xl bg-[var(--secondary)]/10 border border-[var(--border)]/40">
          <FileText className="w-6 h-6 text-[var(--accent)]" />
          <span className="text-sm text-[var(--text)] font-medium">{file.name}</span>
        </div>
      )}

      <div className="text-sm text-[var(--text)]/70 italic">
        Поддерживаемый формат: <b>CSV</b> — должен содержать столбец <b>text</b>.
      </div>

      <button
        onClick={handleAnalyze}
        disabled={isUploading || !file}
        className={`w-full py-5 rounded-2xl text-lg font-semibold tracking-wide bg-[var(--primary)] text-white shadow-[0_0_22px_var(--primary)/60] hover:shadow-[0_0_35px_var(--primary)/80] hover:-translate-y-1 transition-all active:translate-y-1 active:shadow-[0_0_15px_var(--primary)/40] ${isUploading ? 'opacity-70 cursor-not-allowed' : ''}`}
      >
        {isUploading ? `Загрузка... ${uploadProgress}%` : 'Запустить анализ'}
      </button>
{/* процесс бар */}
      {isUploading && (
        <div className="w-full bg-[var(--secondary)]/20 rounded-2xl overflow-hidden h-5 mt-3">
          <div
            className="h-full rounded-2xl transition-all duration-100"
            style={{ width: `${uploadProgress}%`, background: 'linear-gradient(90deg, #e74c3c, #f1c40f, #27ae60)' }}
          ></div>
        </div>
      )}

      {error && <p className="text-red-500 mt-3 text-center">{error}</p>}
    </div>
  );
}

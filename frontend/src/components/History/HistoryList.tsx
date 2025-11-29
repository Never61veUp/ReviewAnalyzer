// Потом удалить
import React from "react";
import { historyData } from "../../data/mockHistory";

interface HistoryListProps {
    onClickItem?: (id: number) => void;
}

const HistoryList: React.FC<HistoryListProps> = ({ onClickItem }) => {
    return (
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4">
            {historyData.map((item) => (
                <div
                    key={item.id}
                    className="p-4 rounded-2xl shadow-xl border-2 flex justify-between items-center cursor-pointer hover:shadow-2xl transition"
                    style={{ borderColor: "var(--accent)", backgroundColor: "var(--background)" }}
                    onClick={() => onClickItem?.(item.id)}
                >
                    <div>
                        <p className="font-semibold" style={{ color: "var(--primary)" }}>
                            {item.date}
                        </p>
                        <p style={{ color: "var(--text)", opacity: 0.8 }}>
                            Отзывов: {item.count}, Позитивных: {item.positivePercent}%
                        </p>
                    </div>
                    <div className="text-2xl">
                        {item.positivePercent > 50 ? "🙂" : "😢"}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HistoryList;

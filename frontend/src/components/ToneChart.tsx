// ToneChart.tsx
import React, { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";
import { motion } from "framer-motion";
import { fetchGroups } from "../api/groups";
import { Group } from "../api/client";
interface GraphData {
  date: string;
  score: number;
}

interface Props {
  graphData: GraphData[];
}

const ToneChart: React.FC = () => {
    const [graphData, setGraphData] = useState<{ date: string; score: number }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetchGroups();
                const data = response.result.groups.map((g: Group) => ({
                    date: new Date(g.date).toLocaleDateString(),
                    score: Math.round(g.generalScore * 100)
                }));
                setGraphData(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    if (loading) return <p className="text-center text-[var(--text)]">Загрузка графика...</p>;

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full h-full p-4"
        >
            <div className="w-full h-60">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={graphData}>
                        <defs>
                            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="var(--primary)" />
                                <stop offset="50%" stopColor="var(--accent)" />
                                <stop offset="100%" stopColor="var(--secondary)" />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--grid)" />
                        <XAxis dataKey="date" stroke="var(--text)" tick={{ fill: "var(--text)" }} />
                        <YAxis domain={[0, 100]} stroke="var(--text)" tick={{ fill: "var(--text)" }} />
                        <Tooltip
                            contentStyle={{
                                background: "var(--tooltip-bg)",
                                backdropFilter: "blur(6px)",
                                borderRadius: "10px",
                                border: "1px solid var(--tooltip-border)",
                                color: "var(--text)"
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="score"
                            stroke="url(#lineGradient)"
                            strokeWidth={3}
                            dot={{ r: 4, fill: "var(--accent)", stroke: "var(--accent)" }}
                            activeDot={{ r: 6, fill: "var(--accent)", stroke: "#fff", strokeWidth: 2 }}
                            isAnimationActive={true}
                            animationDuration={1000}
                            animationEasing="ease-out"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </motion.section>
    );
};

export default ToneChart;

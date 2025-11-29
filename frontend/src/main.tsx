import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/theme.css";
import "./styles/color.css"

const container = document.getElementById("root");
if (!container) throw new Error("Корневой элемент #root не найден");

const root = createRoot(container);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

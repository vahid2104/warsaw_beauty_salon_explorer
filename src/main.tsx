import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
// Suppress TypeScript error for side-effect CSS import when no .d.ts is present
// @ts-ignore: TS2882 - Cannot find module or type declarations for side-effect import
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(<App />);

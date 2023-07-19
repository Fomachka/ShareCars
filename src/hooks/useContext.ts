import { createContext } from "react";

export const ThemeContext = createContext(localStorage.theme || "light");

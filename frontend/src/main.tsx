import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { AppRoutes } from "./AppRoutes.tsx";
import { createTheme, ThemeProvider } from "@mui/material";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={darkTheme}>
                <AppRoutes />
            </ThemeProvider>
        </BrowserRouter>
    </StrictMode>
);

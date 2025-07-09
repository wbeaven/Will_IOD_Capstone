import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import SignIn from "./SignIn.tsx";
import SignUp from "./SignUp.tsx";
import App from "./App.tsx";
import ResponsiveDrawer from "./dashboard.tsx";
import PageNotFound from "./PageNotFound.tsx";
import WorkInProgress from "./WorkInProgress.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path='signIn' element={<SignIn />} />
                <Route path='signUp' element={<SignUp />} />
                <Route path='dashboard' element={<WorkInProgress />}>
                    <Route path='profile' element={<WorkInProgress />} />
                    <Route path='team' element={<WorkInProgress />} />
                </Route>
                <Route path='app' element={<App />} />
                <Route path='responsiveDrawer' element={<ResponsiveDrawer />} />
                <Route path='*' element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>
);

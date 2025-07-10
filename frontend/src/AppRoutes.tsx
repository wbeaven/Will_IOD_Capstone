import { Routes, Route } from "react-router";
import SignIn from "./SignIn.tsx";
import SignUp from "./SignUp.tsx";
import App from "./App.tsx";
import ResponsiveDrawer from "./dashboard.tsx";
import PageNotFound from "./PageNotFound.tsx";
import WorkInProgress from "./WorkInProgress.tsx";

export function AppRoutes() {
    return (
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
    );
}

import { Routes, Route } from "react-router";
import SignIn from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";
import ResponsiveDrawer from "./pages/Dashboard.tsx";
import PageNotFound from "./pages/PageNotFound.tsx";
import WorkInProgress from "./pages/WorkInProgress.tsx";

export function AppRoutes() {
    return (
        <Routes>
            <Route path='signIn' element={<SignIn />} />
            <Route path='signUp' element={<SignUp />} />
            <Route path='dashboard' element={<ResponsiveDrawer />}>
                <Route path='profile' element={<WorkInProgress />} />
                <Route path='team' element={<WorkInProgress />} />
            </Route>
            <Route path='*' element={<PageNotFound />} />
        </Routes>
    );
}

import { Routes, Route } from "react-router";
import SignIn from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";
import ResponsiveDrawer from "./pages/Dashboard.tsx";
import PageNotFound from "./pages/PageNotFound.tsx";
import Profile from "./pages/Profile.tsx";
import TeamHub from "./pages/TeamHub.tsx";
import Team from "./pages/Team.tsx";

export function AppRoutes() {
    return (
        <Routes>
            <Route path='signIn' element={<SignIn />} />
            <Route path='signUp' element={<SignUp />} />
            <Route path='dashboard' element={<ResponsiveDrawer />}>
                <Route path='profile/:id' element={<Profile />} />
                <Route path='teams' element={<TeamHub />} />
                <Route path='teams/:id' element={<Team />} />
            </Route>
            <Route path='*' element={<PageNotFound />} />
        </Routes>
    );
}

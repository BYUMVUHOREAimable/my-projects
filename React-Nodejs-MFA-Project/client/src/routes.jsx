import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Setup2FA from "./pages/Setup2FA.jsx";
import Verify2FA from "./pages/Verify2FA.jsx";
import HomePage from "./pages/HomePage.jsx";
import Error from "./pages/Error.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />,
        errorElement: <Error />,
    },
    {
        path: "/login",
        element: <LoginPage />,
        errorElement: <Error />,
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />,
                errorElement: <Error />,
            },
            {
                path: "/home",
                element: <HomePage />,
                errorElement: <Error />,
            },
            {
                path: "/setup-2fa",
                element: <Setup2FA />,
                errorElement: <Error />,
            },
            {
                path: "/verify-2fa",
                element: <Verify2FA />,
                errorElement: <Error />,
            },
        ],
    },
    
]);

export default router

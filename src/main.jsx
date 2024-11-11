import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/styles/global.css'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootLayout from './layout/RootLayout.jsx'
import ErrorPage from './pages/Error'
import AuthLayout from './layout/authLayout/index.jsx'
import LoginPage from './pages/login/index.jsx'
import DashboardPage from './pages/dashboard/index.jsx'
import SignUpPage from './pages/signup/index.jsx'
import ByBallPage from './pages/byballpage/index.jsx'
import LandingPage from './pages/landingPage/landingPage.jsx'

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ Element, fromRoute = "", ...rest }) => {
    const token = localStorage.getItem('token')

    if (fromRoute === "login" && !token) {
        return Element;
    } else if (fromRoute === "login") {
        return <Navigate to="/dashboard" replace />;
    } else if (!token) {
        return <Navigate to="/" replace />;
    } else return Element;

};

const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />, 
        errorElement: <ErrorPage />,
    },
    {
        path: "/login",
        element: <ProtectedRoute Element={<AuthLayout />} fromRoute="login" />,
        errorElement: <ErrorPage />,
        children: [{ index: true, element: <LoginPage /> }],
    },
    {
        path: "/signup",
        element: <ProtectedRoute Element={<AuthLayout />} fromRoute="login" />,
        errorElement: <ErrorPage />,
        children: [{ index: true, element: <SignUpPage /> }],
    },
    {
        path: '/dashboard',
        element: <ProtectedRoute Element={<RootLayout />} />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <DashboardPage /> },
            { path: ':id', element: <ByBallPage /> },
        ]
    }
])


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)

import { Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Alt404 from "../pages/Alt404";
import Dashboard from "../pages/Dashboard";

const authProtectedRoutes = [
  {
    path:"/dashboard",
    component:<Dashboard />,
    accessRoles: ["user"]
  },
  { path: "*", component: <Navigate to="/login" /> },
];

// Public Routes
const publicRoutes = [
  { path: "/login", component: <Login /> },
  { path: "*", component: <Alt404 /> },
];

export { publicRoutes, authProtectedRoutes };

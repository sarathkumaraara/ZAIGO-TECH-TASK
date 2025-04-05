/* eslint-disable @typescript-eslint/no-explicit-any */
import { Routes, Route } from "react-router-dom";
import { AuthProtected } from "./AuthProtected";
import { publicRoutes, authProtectedRoutes } from "./allRoutes";
//Layouts
//routes

const Index = () => {

  return (
        <Routes>
          <Route>
            {publicRoutes.map((route, idx) => (
              <Route
                key={idx}
                path={route.path}
                element={<div className="layout">{route.component}</div>}
              />
            ))}
          </Route>
          <Route>
            {authProtectedRoutes.map((route: any, idx) => (
              <Route
                key={idx}
                path={route.path}
                element={
                  <AuthProtected accessRoles={route.accessRoles}>
                    {route.component}
                  </AuthProtected>
                }
              />
            ))}
          </Route>
        </Routes>
  );
};

export default Index;

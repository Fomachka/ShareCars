import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./sidebar/Sidebar";
import ProtectedRoute from "./ProtectedRoute";
import { Navigation } from "./Navigation";

export const Layout = () => {
  return (
    <ProtectedRoute>
      <div className="dark:bg-gray-800">
        <Navigation />
        <div className="p-4 sm:ml-64 mt-14 h-screen ">
          <Outlet />
        </div>
      </div>
    </ProtectedRoute>
  );
};

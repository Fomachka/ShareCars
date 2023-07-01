import { Outlet } from "react-router-dom";
import Header from "./headers/Header";
import Sidebar from "./sidebar/Sidebar";
import ProtectedRoute from "./ProtectedRoute";
import { Navigation } from "./Navigation";

export const Layout = () => {
  return (
    <ProtectedRoute>
      <div className="flex flex-col h-screen">
        <Navigation />
        <div className="p-9 md:ml-64 mt-14 flex-1 bg-gray-100 dark:bg-gray-800">
          <Outlet />
        </div>
      </div>
    </ProtectedRoute>
  );
};

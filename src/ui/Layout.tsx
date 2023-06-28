import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./sidebar/Sidebar";
import ProtectedRoute from "./ProtectedRoute";
import { Navigation } from "./Navigation";

export const Layout = () => {
  return (
    <ProtectedRoute>
      <div>
        <Navigation />
        <div className="p-4 sm:ml-64 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <Outlet />
        </div>
      </div>
    </ProtectedRoute>
  );
};

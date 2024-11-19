import { useState } from "react";
import { Outlet } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { Navigation } from "./Navigation";

export const Layout = () => {
  const [toggleMenu, setToggleMenu] = useState(true);
  const [toggleAvatarMenu, setToggleAvatarMenu] = useState(false);

  const handleToggleMenu = () => {
    setToggleMenu((prev) => !prev);
  };

  const handleAvatarToggleMenu = () => {
    setToggleAvatarMenu((prev) => !prev);
  };

  const handleCloseMenu = () => {
    if (!toggleMenu) {
      setToggleMenu(true);
    }
    setToggleAvatarMenu(false);
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col h-screen">
        <Navigation
          toggleMenu={toggleMenu}
          handleToggleMenu={handleToggleMenu}
          toggleAvatarMenu={toggleAvatarMenu}
          handleAvatarToggleMenu={handleAvatarToggleMenu}
        />
        <div
          className="p-9 lg:ml-64 mt-14 flex-1 bg-gray-100 dark:bg-gray-800"
          onClick={() => handleCloseMenu()}
        >
          <Outlet />
        </div>
      </div>
    </ProtectedRoute>
  );
};

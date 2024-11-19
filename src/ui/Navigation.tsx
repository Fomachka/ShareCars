import Header from "./headers/Header";
import Sidebar from "./sidebar/Sidebar";

export const Navigation = ({
  toggleMenu,
  toggleAvatarMenu,
  handleToggleMenu,
  handleAvatarToggleMenu,
}: {
  toggleMenu: boolean;
  toggleAvatarMenu: boolean;
  handleToggleMenu: () => void;
  handleAvatarToggleMenu: () => void;
}) => {
  return (
    <>
      <Header
        handleToggleMenu={handleToggleMenu}
        handleAvatarToggleMenu={handleAvatarToggleMenu}
        toggleAvatarMenu={toggleAvatarMenu}
      />
      <Sidebar toggleMenu={toggleMenu} handleToggleMenu={handleToggleMenu} />
    </>
  );
};

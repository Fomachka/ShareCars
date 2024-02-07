import Header from "./headers/Header";
import Sidebar from "./sidebar/Sidebar";

export const Navigation = ({
  toggleMenu,
  handleToggleMenu,
}: {
  toggleMenu: boolean;
  handleToggleMenu: () => void;
}) => {
  return (
    <>
      <Header handleToggleMenu={handleToggleMenu} />
      <Sidebar toggleMenu={toggleMenu} handleToggleMenu={handleToggleMenu} />
    </>
  );
};

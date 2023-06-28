import { useState } from "react";
import Header from "./Header";
import Sidebar from "./sidebar/Sidebar";

export const Navigation = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  console.log(toggleMenu);
  return (
    <>
      <Header setToggleMenu={setToggleMenu} />
      <Sidebar toggleMenu={toggleMenu} />
    </>
  );
};

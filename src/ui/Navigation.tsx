import { useState } from "react";
import Header from "./headers/Header";
import Sidebar from "./sidebar/Sidebar";

export const Navigation = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <>
      <Header setToggleMenu={setToggleMenu} />
      <Sidebar toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} />
    </>
  );
};

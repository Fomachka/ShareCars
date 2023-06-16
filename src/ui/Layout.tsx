import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Sidebar } from "./sidebar/Sidebar";

export const Layout = () => {
  return (
    <div className="grid grid-cols-[26rem__1fr] h-screen grid-rows-[auto_1fr]">
      <Header />
      <Sidebar />
      <main className="bg-gray-50 pt-16 px-20 pb-24 h-full overflow-scroll">
        <div className=" max-w-[120rem] m-auto flex flex-col gap-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

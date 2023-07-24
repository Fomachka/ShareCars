import { useEffect } from "react";

import useDarkMode from "../hooks/useDarkMode";

const NotFoundError = () => {
  const [colorTheme, setTheme] = useDarkMode();

  useEffect(() => {
    setTheme(localStorage.theme || "light");
  }, []);

  return (
    <main className="h-screen flex justify-center items-center text-3xl bg-gray-200 dark:bg-slate-900 w-full">
      <div className="w-[70vw] h-[60%] bg-white dark:bg-gray-800 rounded-md font-bold flex justify-center items-center flex-col gap-8 md:gap-12 xl:gap-14 border-2 shadow-lg dark:border-slate-900 ">
        <h1 className=" text-red-400 tracking-wide text-[60px] md:text-[100px] xl:text-[140px] xl:mb-4 dark:text-red-400">
          404
        </h1>
        <div className="text-center space-y-2 md:space-y-4 xl:space-y-6 ">
          <p className="text-slate-900 tracking-wide text-base md:text-xl xl:text-2xl dark:text-gray-100">
            The page you&apos;re looking for is missing!
          </p>
        </div>
        <button
          onClick={() => window.location.replace("/")}
          className=" text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none  dark:focus:ring-blue-800 rounded-md  py-3.5 px-5 flex items-center justify-center gap-2 w-fit  sm:py-3 text-sm md:text-lg xl:text-xl mx-auto"
        >
          Back home
        </button>
      </div>
    </main>
  );
};

export default NotFoundError;

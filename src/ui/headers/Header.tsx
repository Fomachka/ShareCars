import useUser from "../../features/authentication/hooks/useUser";
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import useLogout from "../../features/authentication/hooks/useLogout";
import { MdOutlineToggleOn, MdToggleOff } from "react-icons/md";
import useDarkMode from "../../hooks/useDarkMode";
import { ThemeContext } from "../../hooks/useContext";

export default function Headers({
  toggleAvatarMenu,
  handleToggleMenu,
  handleAvatarToggleMenu,
}: {
  toggleAvatarMenu: boolean;
  handleToggleMenu: () => void;
  handleAvatarToggleMenu: () => void;
}) {
  const { user } = useUser();
  const { avatar, firstName, lastName } = user?.user_metadata || {};
  const { logout, isLoginOut } = useLogout();

  const [colorTheme, setTheme] = useDarkMode();
  const [toggleDarkMode, setToggleDarkMode] = useState(
    colorTheme === "light" ? true : false
  );
  const [, setThemeContext] = useContext(ThemeContext);

  // const [toggleAvatarMenu, setToggleAvatarMenu] = useState(false);

  const handleDarkMode = () => {
    setTheme(colorTheme);
    setToggleDarkMode((prev) => !prev);
    setThemeContext(colorTheme);
  };

  return (
    <header>
      <nav className="fixed top-0 z-50 w-full bg-white border-b  border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                onClick={() => handleToggleMenu()}
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a href="/" className="flex ml-2 md:mr-24 items-center ">
                <picture>
                  <source type="image/webp" srcSet="/images/logo.webp" />
                  <source type="image/png" srcSet="/images/logo.png" />
                  <img
                    src="/images/logo.png"
                    alt="ShareCars Logo"
                    width={32}
                    height={32}
                    className="h-auto mr-3 bg-none"
                  />
                </picture>

                <span className="self-center text-xl font-semibold sm:text-2xl  whitespace-nowrap dark:text-gray-100 text-slate-700 align-top">
                  ShareCars
                </span>
              </a>
            </div>
            <div className="flex items-center ">
              <div className="flex items-center">
                <div>
                  <button
                    type="button"
                    className={`flex text-sm outline-none rounded-full hover:scale-105 ${
                      toggleAvatarMenu &&
                      "focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    }`}
                    onClick={() => handleAvatarToggleMenu()}
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full "
                      src={avatar || "/images/default-user.png"}
                      alt="current user photo"
                      width={72}
                      height={72}
                    />
                  </button>
                </div>
                <div
                  className={`z-50 ${
                    toggleAvatarMenu ? "absolute top-12 lg:top-10" : "hidden"
                  } right-5 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600`}
                  id="dropdown-user"
                >
                  <div className="px-4 py-3" role="none">
                    {firstName && lastName ? (
                      <p className="text-sm text-gray-900 dark:text-white" role="none">
                        {firstName + " " + lastName || "User"}
                      </p>
                    ) : (
                      <p className="text-sm text-gray-900 dark:text-white" role="none">
                        Test User
                      </p>
                    )}
                    <p
                      className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                      role="none"
                    >
                      {user?.email || "No email"}
                    </p>
                  </div>
                  <ul className="py-1" role="none">
                    <li onClick={() => handleAvatarToggleMenu()}>
                      <NavLink
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li onClick={() => handleAvatarToggleMenu()}>
                      <NavLink
                        to={`/user/${firstName + "" + lastName}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Settings
                      </NavLink>
                    </li>
                    <li onClick={() => handleAvatarToggleMenu()}>
                      <button
                        onClick={handleDarkMode}
                        disabled={isLoginOut}
                        className="px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 w-full dark:hover:bg-gray-600 dark:hover:text-white flex items-center justify-between gap-4"
                      >
                        Switch Mode
                        {toggleDarkMode ? <MdToggleOff /> : <MdOutlineToggleOn />}
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => logout()}
                        disabled={isLoginOut}
                        className="block px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 w-full dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Log Out
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

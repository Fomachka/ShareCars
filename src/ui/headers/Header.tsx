import useUser from "../../features/authentication/hooks/useUser";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import useLogout from "../../features/authentication/hooks/useLogout";
import { MdOutlineToggleOn, MdToggleOff } from "react-icons/md";
import useDarkMode from "../../hooks/useDarkMode";

export default function Headers({
  setToggleMenu,
}: {
  setToggleMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { user } = useUser();
  const { avatar, firstName, lastName } = user?.user_metadata || {};
  const { logout, isLoginOut } = useLogout();

  const [colorTheme, setTheme] = useDarkMode();
  const [toggleDarkMode, setToggleDarkMode] = useState(
    colorTheme === "light" ? true : false
  );
  const [toggleAvatarMenu, setToggleAvatarMenu] = useState(false);

  const handleDarkMode = () => {
    setTheme(colorTheme);
    setToggleDarkMode((prev) => !prev);
  };

  return (
    <header>
      <nav className="fixed top-0 z-50 w-full bg-white border-b  border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                onClick={() => setToggleMenu((prev) => !prev)}
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
              {/* Icon and Project Name */}
              <a href="https://flowbite.com" className="flex ml-2 md:mr-24">
                <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  className="h-8 mr-3"
                  alt="FlowBite Logo"
                />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  ShareCars
                </span>
              </a>
            </div>
            <div className="flex items-center ">
              <div className="flex items-center">
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    onClick={() => setToggleAvatarMenu((prev) => !prev)}
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full active-none"
                      src={avatar || "/public/images/default-user.jpg"}
                      alt="current user photo"
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
                    <p className="text-sm text-gray-900 dark:text-white" role="none">
                      {firstName + " " + lastName || "User"}
                    </p>
                    <p
                      className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                      role="none"
                    >
                      {user?.email || "No email"}
                    </p>
                  </div>
                  <ul className="py-1" role="none">
                    <li onClick={() => setToggleAvatarMenu((prev) => !prev)}>
                      <NavLink
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li onClick={() => setToggleAvatarMenu((prev) => !prev)}>
                      <NavLink
                        to={`/user/${firstName + "" + lastName}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Settings
                      </NavLink>
                    </li>
                    <li onClick={() => setToggleAvatarMenu((prev) => !prev)}>
                      <button
                        onClick={handleDarkMode}
                        disabled={isLoginOut}
                        className="px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 w-full dark:hover:bg-gray-600 dark:hover:text-white flex items-center justify-between"
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

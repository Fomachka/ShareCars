import { HiOutlineUser } from "react-icons/hi2";
import Logout from "../features/authentication/Logout";
import { useNavigate } from "react-router-dom";
import useUser from "../features/authentication/hooks/useUser";
import { User } from "@supabase/supabase-js";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Headers({
  setToggleMenu,
}: {
  setToggleMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  const { user } = useUser();
  const { avatar, firstName, lastName } = user?.user_metadata || {};
  const [toggleAvatarMenu, setToggleAvatarMenu] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              onClick={() => setToggleMenu((prev) => !prev)}
              aria-controls="logo-sidebar"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
            <a href="https://flowbite.com" className="flex ml-2 md:mr-24">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="h-8 mr-3"
                alt="FlowBite Logo"
              />
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                Flowbite
              </span>
            </a>
          </div>
          <div className="flex items-center ">
            <div className="flex items-center ml-3">
              <div>
                <button
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  onClick={() => setToggleAvatarMenu((prev) => !prev)}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src={avatar || "/public/images/default-user.jpg"}
                    alt="current user photo"
                  />
                </button>
              </div>

              <div
                className={`z-50 ${
                  toggleAvatarMenu ? "absolute top-10" : "hidden"
                } right-5 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600`}
                id="dropdown-user"
              >
                <div className="px-4 py-3" role="none">
                  <p className="text-sm text-gray-900 dark:text-white" role="none">
                    {firstName + " " + lastName}
                  </p>
                  <p
                    className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                    role="none"
                  >
                    {user?.email || "No email"}
                  </p>
                </div>
                <ul className="py-1" role="none">
                  <li>
                    <NavLink
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Settings
                    </NavLink>
                  </li>
                  <li>
                    {/* <NavLink
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                    </NavLink> */}
                    <Logout />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    // <header className="flex gap-10 items-center justify-end bg-white py-4 px-16 border-b-1 border-gray-100">
    //   <div className="space-x-4">
    //     <img
    //       className="inline-block w-10 aspect-[1] object-cover object-center rounded-lg outline-2 outline-gray-100"
    //       src={avatar || "/public/images/default-user.jpg"}
    //       alt={firstName || "avatar"}
    //     />
    //     <span className="text-lg">{firstName + " " + lastName}</span>
    //   </div>
    //   <ul className="flex gap-2">
    //     <li>
    //       <Logout />
    //     </li>
    //     <li>
    //       <button onClick={() => navigate("/account")}>
    //         <HiOutlineUser />
    //       </button>
    //     </li>
    //   </ul>
    // </header>
  );
}

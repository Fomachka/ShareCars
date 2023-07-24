import { NavLink } from "react-router-dom";

import {
  MdPieChart,
  MdCalendarMonth,
  MdGroup,
  MdSettings,
  MdDirectionsCar,
} from "react-icons/md";
import { UploadData } from "../../data/useData";
import useUser from "../../features/authentication/hooks/useUser";

const Sidebar = ({
  toggleMenu,
  setToggleMenu,
}: {
  toggleMenu: boolean;
  setToggleMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { user } = useUser();
  const { firstName, lastName } = user?.user_metadata || {};

  return (
    <aside
      id="logo-sidebar"
      className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
        toggleMenu && "-translate-x-full"
      } bg-white border-r border-gray-200 lg:translate-x-0 dark:bg-gray-900 dark:border-gray-700`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-900 flex flex-col justify-between">
        <ul className="space-y-5">
          <li onClick={() => setToggleMenu((prev) => !prev)}>
            <NavLink className="navigation-menu" to="/dashboard">
              <MdPieChart className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="mt-0.5">Dashboard</span>
            </NavLink>
          </li>
          <li onClick={() => setToggleMenu((prev) => !prev)}>
            <NavLink className="navigation-menu" to="/bookings">
              <MdCalendarMonth className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="">Bookings</span>
            </NavLink>
          </li>
          <li onClick={() => setToggleMenu((prev) => !prev)}>
            <NavLink className="navigation-menu" to="/cars">
              <MdDirectionsCar className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span>Cars</span>
            </NavLink>
          </li>
          <li onClick={() => setToggleMenu((prev) => !prev)}>
            <NavLink className="navigation-menu" to="/users">
              <MdGroup className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span>Members</span>
            </NavLink>
          </li>
          <li onClick={() => setToggleMenu((prev) => !prev)}>
            <NavLink
              className="navigation-menu"
              to={`/user/${firstName + "" + lastName}`}
            >
              <MdSettings className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75" />
              <span>Settings</span>
            </NavLink>
          </li>
        </ul>
        <UploadData />
      </div>
    </aside>
  );
};

export default Sidebar;

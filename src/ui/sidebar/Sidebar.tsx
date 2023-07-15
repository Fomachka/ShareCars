import { NavLink } from "react-router-dom";

import {
  MdPieChart,
  MdCalendarMonth,
  MdGroup,
  MdSettings,
  MdDirectionsCar,
} from "react-icons/md";
import { Uploader } from "../../data/Uploader";

const Sidebar = ({
  toggleMenu,
  setToggleMenu,
}: {
  toggleMenu: boolean;
  setToggleMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <aside
      id="logo-sidebar"
      className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
        toggleMenu && "-translate-x-full"
      } bg-white border-r border-gray-200 lg:translate-x-0 dark:bg-gray-900 dark:border-gray-700`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-900">
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
            <NavLink className="navigation-menu" to="/settings">
              <MdSettings className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75" />
              <span>Settings</span>
            </NavLink>
          </li>
        </ul>
        <Uploader />
      </div>
    </aside>
  );
};

// const NavList = styled.ul`
//   display: flex;
//   flex-direction: column;
//   gap: 0.8rem;
// `;

// const StyledNavLink = styled(NavLink)`
//   &:link,
//   &:visited {
//     display: flex;
//     align-items: center;
//     gap: 1.2rem;

//     color: var(--color-grey-600);
//     font-size: 1.6rem;
//     font-weight: 500;
//     padding: 1.2rem 2.4rem;
//     transition: all 0.3s;
//   }

//   /* This works because react-router places the active class on the active NavLink */
//   &:hover,
//   &:active,
//   &.active:link,
//   &.active:visited {
//     color: var(--color-grey-800);
//     background-color: var(--color-grey-50);
//     border-radius: var(--border-radius-sm);
//   }

//   & svg {
//     width: 2.4rem;
//     height: 2.4rem;
//     color: var(--color-grey-400);
//     transition: all 0.3s;
//   }

//   &:hover svg,
//   &:active svg,
//   &.active:link svg,
//   &.active:visited svg {
//     color: var(--color-brand-600);
//   }
// `;

export default Sidebar;

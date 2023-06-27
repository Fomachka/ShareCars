import { HiArrowRightOnRectangle } from "react-icons/hi2";
import useLogout from "./hooks/useLogout";
import { BiLoaderAlt } from "react-icons/bi";

const Logout = () => {
  const { logout, isLoginOut } = useLogout();

  return (
    <button
      onClick={() => logout()}
      disabled={isLoginOut}
      className="flex justify-center items-center"
    >
      {isLoginOut ? (
        <BiLoaderAlt className="w-6 h-6 animate-spin" />
      ) : (
        <HiArrowRightOnRectangle />
      )}
    </button>
  );
};

export default Logout;

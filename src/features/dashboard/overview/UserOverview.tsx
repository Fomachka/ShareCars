import { useNavigate } from "react-router-dom";
import { BookingFull } from "../useRecentStays";

const UserOverview = ({ info }: { info: BookingFull }) => {
  const navigate = useNavigate();
  return (
    <li
      className="flex items-center justify-between hover:bg-gray-200/50  dark:hover:bg-gray-700 hover:rounded-md py-2 px-4 min-w-[350px]"
      onClick={() => navigate(`/bookings/${info.id}`)}
    >
      <p className="dark:text-gray-100 text-gray-600">
        {info.guests.firstName}
        <span className="block text-sm text-gray-400/80 dark:text-gray-400">
          ({info.guests.email})
        </span>{" "}
      </p>

      <div
        className={`flex justify-center items-center rounded-full py-1 px-3.5 text-gray-50 text-sm gap-2 ${
          info.status === "paid" ? "bg-green-500" : " bg-red-400"
        } `}
      >
        <div className="h-1.5 w-1.5 rounded-full bg-white "></div>
        <p className="whitespace-nowrap">
          {info.status === "paid" ? "Paid" : "Not-paid"}
        </p>
      </div>
    </li>
  );
};

export default UserOverview;

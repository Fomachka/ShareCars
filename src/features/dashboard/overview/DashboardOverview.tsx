import React, { useContext } from "react";
import { ThemeContext } from "../../../hooks/useContext";
import useDashboardOverview from "../../../hooks/useDashboardOverview";
import { Loading } from "../../../ui/Loading";
import UserOverview from "./UserOverview";

const DashboardOverview = () => {
  const [themeContext] = useContext(ThemeContext);
  const { isLoading, overview } = useDashboardOverview();

  return (
    <div
      className={`${
        themeContext === "light" ? "bg-white" : "bg-slate-900"
      } mb-8 rounded-md w-full p-6 h-full  flex-1`}
    >
      <h4 className="text-lg md:text-xl font-semibold text-slate-700 dark:text-gray-300 mb-6 ">
        Recent Activities
      </h4>
      {isLoading && <Loading />}
      {!isLoading && overview?.length === 0 ? (
        <div className="min-h-[240px] flex justify-center items-center bg-gray-100 dark:bg-gray-800 rounded-md">
          <p className=" text-gray-400 text-lg lg:text-xl">
            --- No recent activities ---
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-6 max-h-[240px] overflow-auto">
          {!isLoading &&
            overview &&
            overview.length > 0 &&
            overview.map((info, index) => <UserOverview info={info} key={index} />)}
        </ul>
      )}
    </div>
  );
};

export default DashboardOverview;

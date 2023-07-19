import { ReactNode } from "react";
import { formatCurrency } from "../../utils/helpers";

function Stat({
  icon,
  title,
  value,
  ending,
  color,
}: {
  icon: ReactNode;
  title: string;
  value: number;
  ending: string;
  color: string;
}) {
  return (
    <div
      className={`flex flex-col w-full gap-6 items-start bg-white dark:bg-slate-900  py-6 px-6 rounded-md`}
    >
      <div
        className={`rounded-md object-center object-contain flex justify-center items-center text-white p-4 w-fit`}
        style={{ backgroundColor: `${color}` }}
      >
        {icon}
      </div>
      <div className="text-gray-600 dark:text-gray-300 space-y-1">
        <h5 className="text-lg uppercase tracking-wide font-bold">{title}</h5>
        <p className="text-[14px] text-gray-500/80 dark:text-gray-400/95 tracking-wide">
          {title === "Sales" ? formatCurrency(value) : value} {ending}
        </p>
      </div>
    </div>
  );
}

export default Stat;

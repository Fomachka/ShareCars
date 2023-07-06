import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import { itemsPerPage } from "../utils/globalValues";

export const Pagination = ({ numOfResults }: { numOfResults: number }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  // Magic number
  const currentPage = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const numOfPages = Math.ceil(numOfResults / itemsPerPage);

  const nextPage = () => {
    const next = currentPage === numOfPages ? currentPage : currentPage + 1;
    searchParams.set("page", next.toString());
    setSearchParams(searchParams);
  };

  const prevPage = () => {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set("page", prev.toString());
    setSearchParams(searchParams);
  };

  if (numOfPages <= 1) {
    return null;
  }

  return (
    <footer className="bg-gray-50 dark:bg-slate-800/60 text-slate-800 dark:text-gray-200 border-t-1 rounded-b-md flex justify-center p-6 [&:not(:has(*))]:hidden">
      <div className="w-full flex items-center justify-between">
        <p className="text-base ml-3">
          Results{" "}
          <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
          <span className="font-medium">
            {currentPage === numOfPages ? numOfResults : currentPage * itemsPerPage}
          </span>{" "}
          / <span className="font-medium">{numOfResults}</span> pages
        </p>
      </div>
      <div className="flex gap-2">
        <button
          className="rounded-md font-medium text-base flex items-center justify-center gap-1.5 py-2.5 px-3.5 transition-all border-none dark:text-gray-200 active:bg-blue-400 active:text-gray-500 enabled:hover:bg-blue-700 dark:enabled:hover:bg-blue-600 enabled:hover:text-white disabled:cursor-not-allowed disabled:active:text-red-500 disabled:active:bg-transparent"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          <HiChevronLeft className="w-6 h-6" />
          <span>Prev</span>
        </button>
        <button
          className="rounded-md font-medium text-base flex items-center justify-center gap-1.5 py-2.5 px-3.5 transition-all border-none dark:text-gray-200  enabled:hover:bg-blue-700 dark:enabled:hover:bg-blue-600 enabled:hover:text-white disabled:cursor-not-allowed disabled:active:text-red-500 disabled:active:bg-transparent"
          onClick={nextPage}
          disabled={currentPage === numOfPages}
        >
          <span>Next</span>
          <HiChevronRight className="w-6 h-6" />
        </button>
      </div>
    </footer>
  );
};

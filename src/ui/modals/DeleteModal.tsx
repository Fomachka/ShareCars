import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import { MdOutlineErrorOutline } from "react-icons/md";

const DeleteModal = ({
  closeModal,
  deleteConfirmation,
  deleteMessage,
  navigateTo,
}: {
  closeModal: () => void;
  deleteConfirmation: () => void;
  deleteMessage: string;
  navigateTo?: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = ({ target }: MouseEvent) => {
    if (ref.current && !ref.current.contains(target as Node)) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return createPortal(
    <div className="fixed top-0 left-0 w-full h-screen bg-white/10 dark:bg-slate-900/10 backdrop-blur-sm z-1000 transition-all">
      <div
        className="fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-900 border border-gray-400/60 p-6 transition-all rounded-md shadow-md"
        ref={ref as React.RefObject<HTMLDivElement>}
      >
        <div className="text-right">
          <button onClick={closeModal} className="text-gray-600">
            <HiXMark className="w-6 h-auto" />
          </button>
        </div>
        <div className="p-4 pt-0 text-center ">
          <MdOutlineErrorOutline className="w-16 h-16 text-slate-600 dark:text-gray-300/80  m-auto mb-4" />
          <h3 className="mb-6 text-lg font-normal text-gray-500 dark:text-gray-300/80 ">
            {deleteMessage}
          </h3>
          <button
            type="button"
            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-6 py-3 text-center mr-4"
            onClick={() => {
              deleteConfirmation();
              closeModal();
              if (navigateTo) navigateTo();
            }}
          >
            Yes, I&apos;m sure
          </button>
          <button
            type="button"
            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-6 py-3 hover:text-gray-900 focus:z-10 dark:bg-transparent dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-slate-800 dark:focus:ring-gray-600"
            onClick={closeModal}
          >
            No, cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default DeleteModal;

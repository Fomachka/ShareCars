import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";

const Modal = ({
  children,
  closeModal,
}: {
  children: React.ReactNode;
  closeModal: () => void;
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
    <div className="fixed top-0 left-0 w-full h-screen bg-white/10 backdrop-blur-sm z-1000 transition-all">
      <div
        className="fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-400 p-6 transition-all rounded-md shadow-md"
        ref={ref as React.RefObject<HTMLDivElement>}
      >
        <div className="text-right">
          <button onClick={closeModal} className="text-gray-600">
            <HiXMark className="w-6 h-auto" />
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;

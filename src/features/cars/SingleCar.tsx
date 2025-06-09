import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatPrice } from "../../utils/helpers.ts";
import { deleteCars } from "../../api/apiCars.ts";
import { toast } from "react-hot-toast";
import { useState } from "react";
import Form from "./Form.tsx";
import { HiPencil, HiTrash } from "react-icons/hi2";
import DeleteModal from "../../ui/modals/DeleteModal.tsx";
import Modal from "../../ui/modals/Modal.tsx";
import { MdOutlineMoreVert, MdPerson, MdSettings, MdWaterDrop } from "react-icons/md";
import { useOutsideClick } from "../../utils/useOutsideClick.ts";

export interface PlaceProps {
  created_at: string;
  modelName: string;
  capacity: number;
  id: number;
  image: string;
  maxPeople: number;
  name: string;
  price: number;
  type: string;
  litres: number;
}

export const SingleCar = ({
  setCurrentMenu,
  currentMenu,
  car,
  index,
}: {
  index: number;
  setCurrentMenu: (number: number) => void;
  currentMenu: number;
  car: PlaceProps;
}) => {
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSidemenu, setShowSidemenu] = useState(false);
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: (id: number) => deleteCars(id),
    onSuccess: () => {
      toast.success("Successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["cars"],
      });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const handleDeleteModal = () => {
    setShowModal((prev) => !prev);
  };

  const handleSideMenu = () => {
    setCurrentMenu(index);
    if (currentMenu !== index) {
      setShowSidemenu(true);
    } else {
      setShowSidemenu((prev) => !prev);
    }
  };

  const sideMenuRef = useOutsideClick(() => {
    setShowSidemenu(false);
  });

  return (
    <article
      className={`p-6 bg-white dark:bg-gray-900 rounded-lg flex flex-col justify-between shadow-sm max-w-lg ${
        isLoading && "dark:bg-gray-300"
      }`}
    >
      <div>
        <div className="flex justify-between mb-1 text-gray-700 dark:text-gray-200 relative">
          <span className="text-2xl font-bold">{car?.name}</span>
          <div className="text-right" ref={sideMenuRef}>
            <button
              onClick={handleSideMenu}
              className={`${
                currentMenu === index && showSidemenu
                  ? "border-2 rounded-sm border-blue-500"
                  : "border-2 border-transparent"
              } hover:bg-gray-100 dark:hover:bg-slate-700 align-middle h-full`}
            >
              <MdOutlineMoreVert className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
            {currentMenu === index && showSidemenu && (
              <div className="w-30 text-gray-900 bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg absolute right-10 top-0 rounded-tr-none">
                <button
                  type="button"
                  className="relative inline-flex items-center w-full px-5 py-3 text-sm font-medium dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-700 focus:z-10 focus:ring-1 focus:ring-blue-700 focus:text-blue-700 focus:rounded-t-lg"
                  onClick={() => {
                    setShowForm((prev) => !prev);
                    setShowSidemenu(false);
                  }}
                  disabled={isLoading}
                >
                  <span className="mr-2">
                    <HiPencil className="text-gray-500 dark:text-gray-200 hover:text-gray-800" />
                  </span>
                  Edit
                </button>
                <button
                  type="button"
                  className="relative inline-flex items-center w-full px-5 py-3 text-sm font-medium dark:text-gray-300 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-1 dark:hover:bg-gray-700 focus:ring-blue-700 focus:text-blue-700 focus:rounded-t-lg"
                  onClick={() => {
                    handleDeleteModal();
                    setShowSidemenu(false);
                  }}
                  disabled={isLoading}
                >
                  <span className="mr-2">
                    <HiTrash className="text-gray-500 dark:text-gray-200 hover:text-gray-800" />
                  </span>
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
        <p className=" text-gray-500/70 dark:text-gray-400">{car?.modelName}</p>
      </div>

      <div>
        <img
          className="object-cover object-center w-full max-w-[240px] h-fit mx-auto mt-6"
          src={car?.image}
          alt={car?.modelName}
          width={261}
          height={174}
        />

        <div className="bg-gray-200/60 dark:bg-gray-200/10 w-full h-0.5 mt-6"></div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-6 text-gray-400 dark:text-gray-400 mt-6">
        <div className="flex gap-6 text-center lg:whitespace-nowrap">
          <div>
            <MdPerson className="w-6 h-6 inline-block mr-1" />
            <span className="text-sm text-gray-500/70 dark:text-gray-400/80">
              {car?.capacity}
            </span>
          </div>
          <div>
            <MdSettings className="w-6 h-6 inline-block mr-1 " />
            <span className="text-sm text-gray-500/70 dark:text-gray-400/80 capitalize">
              {car?.type}
            </span>
          </div>
          <div>
            <MdWaterDrop className="w-6 h-6 inline-block mr-1" />
            <span className="text-sm text-gray-500/70 dark:text-gray-400/80">
              {car?.litres} L / 100 km
            </span>
          </div>
        </div>
        <div>
          <p className="text-2xl text-gray-700 dark:text-gray-200 font-bold">
            {formatPrice(car?.price)}
            <span className="text-lg text-gray-500/70 dark:text-gray-400 font-normal">
              /day
            </span>
          </p>
        </div>
      </div>
      {showForm && (
        <Modal closeModal={() => setShowForm(false)}>
          <Form editCar={car} onCloseModal={() => setShowForm(false)} />
        </Modal>
      )}
      {showModal && (
        <DeleteModal
          closeModal={() => setShowModal(false)}
          deleteConfirmation={() => mutate(car.id)}
          deleteMessage="Are you sure you want to delete this product?"
        />
      )}
    </article>
  );
};

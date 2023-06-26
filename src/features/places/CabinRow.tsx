import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatCurrency } from "../../utils/helpers.ts";
import { deletePlaces } from "../../api/apiPlaces.ts";
import { toast } from "react-hot-toast";
import { useState } from "react";
import Form from "./Form.tsx";
import { HiPencil, HiTrash, HiListBullet } from "react-icons/hi2";
import DeleteModal from "../../ui/modals/DeleteModal.tsx";
import Modal from "../../ui/modals/Modal.tsx";

export interface PlaceProps {
  created_at: string;
  description: string;
  discountPrice: number;
  id: number;
  image: string;
  maxPeople: number;
  name: string;
  price: number;
}

export const CabinRow = ({
  setCurrentMenu,
  currentMenu,
  place,
  index,
}: {
  index: number;
  setCurrentMenu: (number: number) => void;
  currentMenu: number;
  place: PlaceProps;
}) => {
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSidemenu, setShowSidemenu] = useState(false);
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: (id: number) => deletePlaces(id),
    onSuccess: () => {
      toast.success("Successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["places"],
      });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const handleDeleteModal = () => {
    setShowModal((prev) => !prev);
    // () => mutate(place.id)
  };

  const handleSideMenu = () => {
    setCurrentMenu(index);
    if (currentMenu !== index) {
      setShowSidemenu(true);
    } else {
      setShowSidemenu((prev) => !prev);
    }
  };

  return (
    <>
      <div
        className="grid grid-cols-[0.6fr_1.8fr_2.2fr_1fr_1fr_1fr] gap-10 items-center py-6 px-10 [&:not(:last-child)]:border-b-2 [&:not(:last-child)]:border-gray-100 "
        role="row"
      >
        <img
          className="object-cover object-center aspect-[3/2] w-25 scale-150 -translate-x-3"
          src={place?.image}
          alt={place.description}
        />
        <p className="text-2xl font-semibold text-gray-600">{place.name}</p>
        <p>Fits up to {place.maxPeople} guests</p>
        <p className="font-semibold">{formatCurrency(place.price)}</p>
        <p className="font-medium text-green-700">
          {place.discountPrice ? formatCurrency(place.discountPrice) : "--"}
        </p>
        <div className="text-right">
          <button
            className={`${
              currentMenu === index && showSidemenu
                ? "border-2 rounded-sm border-blue-500"
                : "border-2 border-transparent"
            } hover:bg-gray-100 align-middle h-full`}
          >
            <HiListBullet onClick={handleSideMenu} className="w-8 h-full text-gray-600" />
          </button>
          {currentMenu === index && showSidemenu && (
            <div
              className={`w-48 text-gray-900 bg-white border border-gray-200 rounded-lg absolute right-20 top-${
                15 * (index + 1)
              } `}
            >
              <button
                type="button"
                className="relative inline-flex items-center w-full px-5 py-3 text-sm font-medium hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-1 focus:ring-blue-700 focus:text-blue-700 focus:rounded-t-lg"
                onClick={() => {
                  setShowForm((prev) => !prev);
                  setShowSidemenu(false);
                }}
                disabled={isLoading}
              >
                <span className="mr-2">
                  <HiPencil />
                </span>
                Edit
              </button>

              <button
                type="button"
                className="relative inline-flex items-center w-full px-5 py-3 text-sm font-medium rounded-b-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-1 focus:ring-blue-700 focus:text-blue-700"
                onClick={() => {
                  handleDeleteModal();
                  setShowSidemenu(false);
                }}
                disabled={isLoading}
              >
                <span className="mr-2">
                  <HiTrash />
                </span>
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      {showForm && (
        <Modal closeModal={() => setShowForm(false)}>
          <Form editPlace={place} onCloseModal={() => setShowForm(false)} />
        </Modal>
      )}
      {showModal && (
        <DeleteModal
          closeModal={() => setShowModal(false)}
          deleteConfirmation={() => mutate(place.id)}
          deleteMessage="Are you sure you want to delete this product?"
        />
      )}
    </>
  );
};

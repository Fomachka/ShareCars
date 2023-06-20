import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatCurrency } from "../../utils/helpers.ts";
import { deletePlaces } from "../../services/apiPlaces.ts";
import { toast } from "react-hot-toast";
import { useState } from "react";
import Form from "./Form.tsx";
import { HiPencil, HiTrash } from "react-icons/hi2";
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

export const CabinRow = ({ place }: { place: PlaceProps }) => {
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
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

  return (
    <>
      <div
        className="grid grid-cols-[0.6fr_1.8fr_2.2fr_1fr_1fr_1fr] gap-10 items-center py-6 px-10 [&:not(:last-child)]:border-b-1 [&:not(:last-child)]:border-gray-100 "
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
        <div className="flex space-x-2">
          <button
            onClick={() => setShowForm((prev) => !prev)}
            disabled={isLoading}
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            <HiPencil />
          </button>
          <button
            onClick={handleDeleteModal}
            disabled={isLoading}
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 "
          >
            <HiTrash />
          </button>
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
        />
      )}
    </>
  );
};

import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiListBullet,
  HiOutlineInformationCircle,
  HiTrash,
} from "react-icons/hi2";
import { Booking, Guests, Places } from "./BookingTable";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useCheckoutData from "../../hooks/useCheckoutData";
import DeleteModal from "../../ui/modals/DeleteModal";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../api/apiBookings";
import useDeleteBooking from "./hooks/useDeleteBooking";

export const BookingRow = ({
  booking,
  setCurrentMenu,
  index,
  currentMenu,
}: {
  booking: Booking;
  setCurrentMenu: (number: number) => void;
  currentMenu: number;
  index: number;
}) => {
  const { places, guests }: { places: Places; guests: Guests } = booking;
  const [showModal, setShowModal] = useState(false);
  const [showSidemenu, setShowSidemenu] = useState(false);
  const navigate = useNavigate();
  const { checkOut, isCheckingOut } = useCheckoutData();
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteBooking } = useDeleteBooking();

  const handleSideMenu = () => {
    setCurrentMenu(index);
    if (currentMenu !== index) {
      setShowSidemenu(true);
    } else {
      setShowSidemenu((prev) => !prev);
    }
  };

  const handleDeleteModal = () => {
    setShowModal((prev) => !prev);
    // () => mutate(place.id)
  };

  return (
    <div
      className="grid grid-cols-[0.6fr_2fr_2.4fr_1.4fr_1fr_3.2rem] gap-10 items-center py-6 px-10 [&:not(:last-child)]:border-b-2 [&:not(:last-child)]:border-gray-100 "
      role="row"
    >
      <p className="text-2xl font-semibold text-gray-600">{places.name}</p>
      <p>{guests.firstName + " " + guests.lastName}</p>
      <p className="font-semibold">{booking.numOfNights} Nights</p>
      <p
        className={`font-medium ${booking.status === "Not Confirmed" && "text-red-600"} ${
          booking.status === "unconfirmed" && "text-yellow-500"
        }`}
      >
        {booking.status}
      </p>
      <div className="">$ {booking.totalPrice}</div>

      {/* <button onClick={() => navigate(`/bookings/${booking.id}`)}>
        <HiOutlineInformationCircle className="w-8 h-full text-gray-600 hover:text-gray-800 " />
      </button> */}
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
              20 * (index + 1)
            } `}
          >
            <button
              type="button"
              className="relative inline-flex items-center w-full px-5 py-3 text-sm font-medium hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-1 focus:ring-blue-700 focus:text-blue-700 focus:rounded-t-lg"
              onClick={() => {
                navigate(`/bookings/${booking.id}`);
                setShowSidemenu(false);
              }}
            >
              <span className="mr-2">
                <HiEye />
              </span>
              See Details
            </button>

            {booking?.status === "checked-in" && (
              <button
                type="button"
                className="relative inline-flex items-center w-full px-5 py-3 text-sm font-medium rounded-b-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-1 focus:ring-blue-700 focus:text-blue-700"
                disabled={isCheckingOut}
                onClick={() => {
                  setShowSidemenu(false);
                  if (booking.id) checkOut(booking?.id);
                }}
              >
                <span className="mr-2">
                  <HiArrowUpOnSquare />
                </span>
                Check Out
              </button>
            )}
            {booking?.status === "unconfirmed" && (
              <button
                type="button"
                className="relative inline-flex items-center w-full px-5 py-3 text-sm font-medium rounded-b-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-1 focus:ring-blue-700 focus:text-blue-700"
                onClick={() => {
                  navigate(`/checkin/${booking.id}`);
                  setShowSidemenu(false);
                }}
              >
                <span className="mr-2">
                  <HiArrowDownOnSquare />
                </span>
                Check In
              </button>
            )}
            <button
              type="button"
              className="relative inline-flex items-center w-full px-5 py-3 text-sm font-medium rounded-b-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-1 focus:ring-blue-700 focus:text-blue-700"
              onClick={() => {
                handleDeleteModal();
                setShowSidemenu(false);
              }}
            >
              <span className="mr-2">
                <HiTrash />
              </span>
              Delete
            </button>
          </div>
        )}
      </div>
      {showModal && (
        <DeleteModal
          closeModal={() => setShowModal(false)}
          deleteConfirmation={() => {
            if (booking.id) deleteBooking(booking.id);
          }}
          deleteMessage="Are you sure you want to delete this booking?"
        />
      )}
    </div>
  );
};

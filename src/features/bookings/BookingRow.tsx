import { HiTrash } from "react-icons/hi2";
import { Booking, Guests, Places } from "./BookingTable";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useCheckoutData from "../../hooks/useCheckoutData";
import DeleteModal from "../../ui/modals/DeleteModal";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../api/apiBookings";
import useDeleteBooking from "./hooks/useDeleteBooking";
import {
  MdCheck,
  MdCheckBox,
  MdOutlineMoreVert,
  MdPriceCheck,
  MdRemoveRedEye,
} from "react-icons/md";

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
  const { cars, guests }: { cars: Places; guests: Guests } = booking;
  const [showModal, setShowModal] = useState(false);
  const [showSidemenu, setShowSidemenu] = useState(false);
  const navigate = useNavigate();
  const { checkOut, isCheckingOut } = useCheckoutData();
  const queryClient = useQueryClient();

  const payStatus = () => {
    if (booking?.status === "not-paid") {
      return "Not paid";
    } else if (booking?.status === "paid") {
      return "Paid";
    } else {
      return "Not paid";
    }
  };

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
    <>
      {/* // [&:not(:last-child)]:border-b-2 [&:not(:last-child)]:border-gray-100 */}
      <tr className="grid grid-cols-[2fr_2fr_2.4fr_1.4fr_1fr_3.2rem] gap-20 items-center tracking-wide text-gray-600 dark:text-gray-100 py-6 px-10 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-slate-900 border-spacing-[20px] m-2 hover:rounded-md 2xl:text-lg">
        <td className="min-w-[100px] overflow-hidden text-ellipsis max-w-[100px]">
          {guests.firstName + " " + guests.lastName}
        </td>
        <td className="min-w-[100px] overflow-hidden text-ellipsis max-w-[100px]">
          {cars.name}
        </td>
        <td className="min-w-[100px] overflow-hidden text-ellipsis max-w-[100px]">
          {booking.numOfNights} Nights
        </td>
        <td className="min-w-[100px] overflow-hidden text-ellipsis max-w-[100px]">
          $ {booking.totalPrice}
        </td>
        <td
          className={`flex justify-center items-center gap-2 font-medium min-w-[100px] overflow-hidden text-ellipsis max-w-[100px] rounded-full py-1 px-2 text-gray-50 2xl:py-1.5 ${
            booking.status === "not-paid" && "bg-red-400"
          } ${booking.status === "paid" && "bg-green-500"}`}
        >
          <div className="h-1.5 w-1.5 rounded-full bg-white font-sm"></div>
          <div className="text-sm ">{payStatus()}</div>
        </td>

        <td className="text-right relative">
          <button
            className={`${
              currentMenu === index && showSidemenu
                ? "border-2 rounded-sm border-blue-500"
                : "border-2 border-transparent"
            } px-[0.05rem] py-[0.2rem] hover:bg-gray-100 dark:hover:bg-slate-700 align-middle h-full`}
          >
            <MdOutlineMoreVert
              onClick={handleSideMenu}
              className="w-6 h-6 text-gray-600 dark:text-gray-300"
            />
          </button>
          {currentMenu === index && showSidemenu && (
            <div className="w-48 text-gray-900 dark:bg-slate-900 bg-white border border-gray-200 dark:border-gray-700 rounded-lg absolute right-10 top-[1px] rounded-tr-none">
              <button
                type="button"
                className="relative inline-flex items-center w-full px-5 py-3 text-sm font-medium text-slate-700 hover:bg-gray-100 hover:text-slate-800 focus:rounded-t-lg dark:text-gray-300  dark:hover:bg-gray-700"
                onClick={() => {
                  navigate(`/bookings/${booking.id}`);
                  setShowSidemenu(false);
                }}
              >
                <span className="mr-3">
                  <MdRemoveRedEye className="text-gray-500 dark:text-gray-400 hover:text-gray-800" />
                </span>
                See Details
              </button>

              {booking?.status === "not-paid" && (
                <button
                  type="button"
                  className="relative inline-flex items-center w-full px-5 py-3 text-sm font-medium hover:bg-gray-100 text-slate-700 dark:text-gray-300 hover:text-slate-800 dark:hover:bg-gray-700"
                  disabled={isCheckingOut}
                  onClick={() => {
                    setShowSidemenu(false);
                    if (booking.id) checkOut(booking?.id);
                  }}
                >
                  <span className="mr-3">
                    <MdCheckBox className="text-gray-500 dark:text-gray-400 hover:text-gray-800" />
                  </span>
                  Confirm Payment
                </button>
              )}
              {/* {booking?.status === "unconfirmed" && (
                <button
                  type="button"
                  className="relative inline-flex items-center w-full px-5 py-3 text-sm font-medium rounded-b-lg hover:bg-gray-100 hover:text-slate-800 focus:z-10 focus:ring-1 focus:ring-blue-700 focus:text-blue-700"
                  onClick={() => {
                    navigate(`/checkin/${booking.id}`);
                    setShowSidemenu(false);
                  }}
                >
                  <span className="mr-2">
                    <HiArrowDownOnSquare className="text-gray-500 dark:text-gray-400 hover:text-gray-800" />
                  </span>
                  Confirm payment
                </button>
              )} */}
              <button
                type="button"
                className="relative inline-flex items-center w-full px-5 py-3 text-sm font-medium hover:text-slate-800 rounded-b-lg hover:bg-gray-100 focus:z-10 dark:text-gray-300  dark:hover:bg-gray-700"
                onClick={() => {
                  handleDeleteModal();
                  setShowSidemenu(false);
                }}
              >
                <span className="mr-3">
                  <HiTrash className="text-gray-500 dark:text-gray-400 hover:text-gray-800" />
                </span>
                Delete
              </button>
            </div>
          )}
        </td>
      </tr>
      {showModal && (
        <DeleteModal
          closeModal={() => setShowModal(false)}
          deleteConfirmation={() => {
            if (booking.id) deleteBooking(booking.id);
          }}
          deleteMessage="Are you sure you want to delete this booking?"
        />
      )}
    </>
  );
};

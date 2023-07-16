import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatCurrency } from "../../utils/helpers.ts";
import { deleteCars } from "../../api/apiCars.ts";
import { toast } from "react-hot-toast";
import { useState } from "react";
import Form from "./Form.tsx";
import { HiPencil, HiTrash } from "react-icons/hi2";
import DeleteModal from "../../ui/modals/DeleteModal.tsx";
import Modal from "../../ui/modals/Modal.tsx";
import { MdOutlineMoreVert, MdPerson, MdSettings, MdWaterDrop } from "react-icons/md";

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
    // () => mutate(car.id)
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
    <article
      className={`p-6 bg-white dark:bg-gray-900 rounded-lg flex flex-col justify-between shadow-sm max-w-lg ${
        isLoading && "dark:bg-gray-300"
      }`}
    >
      <div>
        <div className="flex justify-between mb-1 text-gray-700 dark:text-gray-200 relative">
          <span className="text-2xl font-bold">{car?.name}</span>
          <div className="text-right">
            <button
              className={`${
                currentMenu === index && showSidemenu
                  ? "border-2 rounded-sm border-blue-500"
                  : "border-2 border-transparent"
              } hover:bg-gray-100 dark:hover:bg-slate-700 align-middle h-full`}
            >
              <MdOutlineMoreVert
                onClick={handleSideMenu}
                className="w-6 h-6 text-gray-600 dark:text-gray-300"
              />
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
            {formatCurrency(car?.price)}
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

// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { formatCurrency } from "../../utils/helpers.ts";
// import { deleteCars } from "../../api/apiCars.ts";
// import { toast } from "react-hot-toast";
// import { useState } from "react";
// import Form from "./Form.tsx";
// import { HiPencil, HiTrash, HiListBullet } from "react-icons/hi2";
// import DeleteModal from "../../ui/modals/DeleteModal.tsx";
// import Modal from "../../ui/modals/Modal.tsx";

// export interface PlaceProps {
//   created_at: string;
//   description: string;
//   discountPrice: number;
//   id: number;
//   image: string;
//   maxPeople: number;
//   name: string;
//   price: number;
// }

// export const SingleCar = ({
//   setCurrentMenu,
//   currentMenu,
//   car,
//   index,
// }: {
//   index: number;
//   setCurrentMenu: (number: number) => void;
//   currentMenu: number;
//   car: PlaceProps;
// }) => {
//   const [showForm, setShowForm] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [showSidemenu, setShowSidemenu] = useState(false);
//   const queryClient = useQueryClient();

//   const { isLoading, mutate } = useMutation({
//     mutationFn: (id: number) => deleteCars(id),
//     onSuccess: () => {
//       toast.success("Successfully deleted");
//       queryClient.invalidateQueries({
//         queryKey: ["cars"],
//       });
//     },
//     onError: (err: Error) => toast.error(err.message),
//   });

//   const handleDeleteModal = () => {
//     setShowModal((prev) => !prev);
//     // () => mutate(car.id)
//   };

//   const handleSideMenu = () => {
//     setCurrentMenu(index);
//     if (currentMenu !== index) {
//       setShowSidemenu(true);
//     } else {
//       setShowSidemenu((prev) => !prev);
//     }
//   };

//   return (
//     <>
//       <div
//         className="grid grid-cols-[0.6fr_1.8fr_2.2fr_1fr_1fr_1fr] gap-10 items-center py-6 px-10 [&:not(:last-child)]:border-b-2 [&:not(:last-child)]:border-gray-100 "
//         role="row"
//       >
//         <img
//           className="object-cover object-center aspect-[3/2] w-25 scale-150 -translate-x-3"
//           src={car?.image}
//           alt={car.description}
//         />
//         <p className="text-2xl font-semibold text-gray-600">{car.name}</p>
//         <p>Fits up to {car.maxPeople} guests</p>
//         <p className="font-semibold">{formatCurrency(car.price)}</p>
//         <p className="font-medium text-green-700">
//           {car.discountPrice ? formatCurrency(car.discountPrice) : "--"}
//         </p>
//         <div className="text-right">
//           <button
//             className={`${
//               currentMenu === index && showSidemenu
//                 ? "border-2 rounded-sm border-blue-500"
//                 : "border-2 border-transparent"
//             } hover:bg-gray-100 align-middle h-full`}
//           >
//             <HiListBullet onClick={handleSideMenu} className="w-8 h-full text-gray-600" />
//           </button>
//           {currentMenu === index && showSidemenu && (
//             <div
//               className={`w-48 text-gray-900 bg-white border border-gray-200 rounded-lg absolute right-20 top-${
//                 15 * (index + 1)
//               } `}
//             >
//               <button
//                 type="button"
//                 className="relative inline-flex items-center w-full px-5 py-3 text-sm font-medium hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-1 focus:ring-blue-700 focus:text-blue-700 focus:rounded-t-lg"
//                 onClick={() => {
//                   setShowForm((prev) => !prev);
//                   setShowSidemenu(false);
//                 }}
//                 disabled={isLoading}
//               >
//                 <span className="mr-2">
//                   <HiPencil />
//                 </span>
//                 Edit
//               </button>

//               <button
//                 type="button"
//                 className="relative inline-flex items-center w-full px-5 py-3 text-sm font-medium rounded-b-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-1 focus:ring-blue-700 focus:text-blue-700"
//                 onClick={() => {
//                   handleDeleteModal();
//                   setShowSidemenu(false);
//                 }}
//                 disabled={isLoading}
//               >
//                 <span className="mr-2">
//                   <HiTrash />
//                 </span>
//                 Delete
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//       {showForm && (
//         <Modal closeModal={() => setShowForm(false)}>
//           <Form editCar={car} onCloseModal={() => setShowForm(false)} />
//         </Modal>
//       )}
//       {showModal && (
//         <DeleteModal
//           closeModal={() => setShowModal(false)}
//           deleteConfirmation={() => mutate(car.id)}
//           deleteMessage="Are you sure you want to delete this product?"
//         />
//       )}
//     </>
//   );
// };

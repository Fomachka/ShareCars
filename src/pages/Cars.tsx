import { CabinTable } from "../features/cars/CabinTable.js";
import Form from "../features/cars/Form.js";
import { useState } from "react";
import Modal from "../ui/modals/Modal.js";
import Filter from "../features/cars/Filter.js";
import PageHeader from "../ui/headers/PageHeader.js";
import { MdAssignmentAdd } from "react-icons/md";

const Cars = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <main>
      <PageHeader
        header="Available cars"
        paragraph="See and manage schedule bookings of all guests."
      />
      <section className="relative ">
        <div className="flex items-center justify-between flex-wrap">
          <Filter
            currentFilter="type"
            allFilters={[
              { value: "all", category: "All" },
              { value: "auto", category: "Auto" },
              { value: "manual", category: "Manual" },
            ]}
            allSorting={[
              { value: "name-asc", category: "Sort by: name (A-Z)" },
              { value: "name-desc", category: "Sort by name (Z-A)" },
              { value: "price-asc", category: "Sort by lowest price" },
              { value: "price-desc", category: "Sort by highest price" },
              { value: "capacity-asc", category: "Sort by capacity (low)" },
              { value: "capacity-desc", category: "Sort by capacity (high)" },
            ]}
          />
          <button
            type="button"
            className=" text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none  dark:focus:ring-blue-800 rounded-md  py-3.5 px-4 flex items-center justify-center gap-2 w-full md:w-fit mb-8 md:mb-0 sm:py-3 text-sm xsm:text-base"
            onClick={() => setShowModal((prev) => !prev)}
          >
            <MdAssignmentAdd className="inline-block w-5 h-5" />
            Add New Car
          </button>
        </div>
        <CabinTable />
        {showModal && (
          <Modal closeModal={() => setShowModal(false)}>
            <Form editCar={{}} onCloseModal={() => setShowModal(false)} />
          </Modal>
        )}
      </section>
    </main>
  );
};

export default Cars;

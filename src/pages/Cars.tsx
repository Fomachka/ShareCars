import { CabinTable } from "../features/cars/CabinTable.js";
import Form from "../features/cars/Form.js";
import { useState } from "react";
import Modal from "../ui/modals/Modal.js";
import { Filter } from "../features/cars/Filter.js";
import PageHeader from "../ui/headers/PageHeader.js";

const Cars = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <PageHeader
        header="Available cars"
        paragraph="See and manage schedule bookings of all guests."
      />
      <section className="relative">
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
        <h3 className="pl-2 text-sm text-gray-400 dark:text-gray-400 xl:text-base mb-4">
          Active Cars (4 Cars)
        </h3>
        <CabinTable />
        <button
          type="button"
          className="my-6 w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none  dark:focus:ring-blue-800 font-medium rounded-lg text-base py-4 text-center"
          onClick={() => setShowModal((prev) => !prev)}
        >
          Add new place
        </button>
        {showModal && (
          <Modal closeModal={() => setShowModal(false)}>
            <Form editCar={{}} onCloseModal={() => setShowModal(false)} />
          </Modal>
        )}
      </section>
    </>
  );
};

export default Cars;

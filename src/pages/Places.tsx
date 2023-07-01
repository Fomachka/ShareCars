import { CabinTable } from "../features/places/CabinTable.js";
import Form from "../features/places/Form.js";
import { useState } from "react";
import Modal from "../ui/modals/Modal.js";
import { Filter } from "../features/places/Filter.js";
import PageHeader from "../ui/headers/PageHeader.js";

const Places = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <PageHeader
        header="All places"
        paragraph="See and manage schedule bookings of all guests."
      />
      <section className="relative">
        <Filter
          currentFilter="discount"
          allFilters={[
            { value: "all", category: "All" },
            { value: "no-discount", category: "No Discount" },
            { value: "with-discount", category: "With Discount" },
          ]}
          allSorting={[
            { value: "name-asc", category: "Sort by: name (A-Z)" },
            { value: "name-desc", category: "Sort by name (Z-A)" },
            { value: "price-asc", category: "Sort by lowest price" },
            { value: "price-desc", category: "Sort by highest price" },
            { value: "maxPeople-asc", category: "Sort by capacity (low)" },
            { value: "maxPeople-desc", category: "Sort by capacity (high)" },
          ]}
        />
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
            <Form editPlace={{}} onCloseModal={() => setShowModal(false)} />
          </Modal>
        )}
      </section>
    </>
  );
};

export default Places;

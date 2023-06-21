import { CabinTable } from "../features/places/CabinTable.js";
import Form from "../features/places/Form.js";
import { useState } from "react";
import Modal from "../ui/modals/Modal.js";
import { Filter } from "../features/places/Filter.js";

function Cabins() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <header className="flex justify-between items-center">
        <h1 className="text-4xl font-semibold text-gray-700">All places</h1>
        <Filter
          currentFilter="discount"
          allFilters={[
            { value: "all", category: "All" },
            { value: "no-discount", category: "No Discount" },
            { value: "with-discount", category: "With Discount" },
          ]}
        />
      </header>
      <section>
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
}

export default Cabins;

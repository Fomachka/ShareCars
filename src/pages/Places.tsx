import { CabinTable } from "../features/places/CabinTable.js";
import Form from "../features/places/Form.js";
import { useState } from "react";

function Cabins() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <header className="flex justify-between items-center">
        <h1 className="text-4xl font-semibold">All places</h1>
        <p>Filter / Sort</p>
      </header>
      <section>
        <CabinTable />
        <button
          type="button"
          className="my-6 w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none  dark:focus:ring-blue-800 font-medium rounded-lg text-base py-4 text-center"
          onClick={() => setShowForm((prev) => !prev)}
        >
          Add new place
        </button>
        {showForm && <Form />}
      </section>
    </>
  );
}

export default Cabins;

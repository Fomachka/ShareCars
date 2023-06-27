import CreateUser from "../features/users/CreateUser";

const NewUsers = () => {
  return (
    <>
      <header>
        <h1 className="text-4xl font-semibold text-gray-700">All users</h1>
      </header>
      <section>
        <CreateUser />
      </section>
    </>
  );
};

export default NewUsers;

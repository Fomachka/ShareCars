import CreateUser from "../features/users/CreateUser";
import PageHeader from "../ui/headers/PageHeader";

const NewUsers = () => {
  return (
    <>
      <PageHeader
        header="Members"
        paragraph="Create and manage new administrator users."
      />
      <section>
        <CreateUser />
      </section>
    </>
  );
};

export default NewUsers;

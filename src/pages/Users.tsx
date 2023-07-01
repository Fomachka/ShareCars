import CreateUser from "../features/users/CreateUser";
import PageHeader from "../ui/headers/PageHeader";

const NewUsers = () => {
  return (
    <>
      <PageHeader
        header="Members"
        paragraph="Create new users for your managing your business."
      />
      <section>
        <CreateUser />
      </section>
    </>
  );
};

export default NewUsers;

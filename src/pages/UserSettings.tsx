import UpdateUserPassword from "../features/usersettings/UpdateUserPassword";
import UpdateUserSettings from "../features/usersettings/UpdateUserSettings";
import PageHeader from "../ui/headers/PageHeader";

const UserSettings = () => {
  return (
    <>
      <PageHeader
        header="My profile"
        paragraph="A place to update your personal information."
      />
      <section>
        <UpdateUserSettings />
        <UpdateUserPassword />
      </section>
    </>
  );
};

export default UserSettings;

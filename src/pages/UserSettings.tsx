import UpdateUserPassword from "../features/usersettings/UpdateUserPassword";
import UpdateUserSettings from "../features/usersettings/UpdateUserSettings";

const UserSettings = () => {
  return (
    <div>
      <UpdateUserSettings />
      <UpdateUserPassword />
    </div>
  );
};

export default UserSettings;

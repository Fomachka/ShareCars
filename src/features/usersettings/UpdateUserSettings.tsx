import useUser from "../authentication/hooks/useUser";
import { FormEvent, useState } from "react";
import { User } from "@supabase/supabase-js";
import useUpdateUser from "./hooks/useUpdateUser";

const userSettings = () => {
  const { user } = useUser();
  const { email, user_metadata } = user as User;
  const { firstName: firstNameData, lastName: lastNameData } = user_metadata;

  const [firstName, setFirstName] = useState(firstNameData);
  const [lastName, setLastName] = useState(lastNameData);
  const { updateUser, isUpdating } = useUpdateUser();
  const [avatar, setAvatar] = useState<File | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!firstName) return;
    updateUser(
      { firstName, lastName, avatar },
      {
        onSuccess: () => {
          (event.target as HTMLFormElement).reset();
        },
      }
    );
  };

  return (
    <form className="py-8 px-6 space-y-6" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
          Email{" "}
        </label>
        <input
          type="text"
          id="email"
          disabled={true}
          placeholder={email || "no email"}
          autoComplete="off"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 disabled:bg-gray-200 disabled:cursor-not-allowed"
        />
      </div>
      <div>
        <label
          htmlFor="firstName"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          First name{" "}
        </label>
        <input
          type="text"
          id="firstName"
          autoComplete="given-name"
          disabled={isUpdating}
          onChange={(e) => setFirstName(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2
          disabled:bg-gray-200 disabled:cursor-not-allowed"
        />
      </div>
      <div>
        <label
          htmlFor="lastName"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Last name{" "}
        </label>
        <input
          type="text"
          id="lastName"
          disabled={isUpdating}
          onChange={(e) => setLastName(e.target.value)}
          autoComplete="family-name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 disabled:bg-gray-200 disabled:cursor-not-allowed"
        />
      </div>

      <div>
        <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 ">
          Image
        </label>
        <input
          id="image"
          type="file"
          disabled={isUpdating}
          onChange={(e) => {
            if (e.target.files === null) {
              setAvatar(null);
            } else if (e.target.files) {
              setAvatar(e.target.files[0]);
            }
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 disabled:bg-gray-200 disabled:cursor-not-allowed"
        />
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-6 py-3 text-center flex-1 disabled:bg-gray-200 disabled:cursor-not-allowed"
        disabled={isUpdating}
      >
        Apply changes
      </button>
      <button
        type="reset"
        className="text-gray-900 bg-gray-100 ml-5 hover:bg-gray-200 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-6 py-3 text-center flex-1"
      >
        Cancel
      </button>
    </form>
  );
};

export default userSettings;
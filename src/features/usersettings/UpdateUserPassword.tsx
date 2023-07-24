import { SubmitHandler, useForm } from "react-hook-form";
import useUpdateUser from "./hooks/useUpdateUser";

type FormValues = {
  password?: string;
  confirmPassword?: string;
};

const UpdateUserPassword = () => {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { updateUser, isUpdating } = useUpdateUser();
  const { errors } = formState;

  const onSubmit: SubmitHandler<FormValues> = ({ password }) => {
    updateUser(
      {
        password: password as string,
      },
      {
        onSettled: () => reset(),
      }
    );
  };

  return (
    <article>
      <h3 className="dark:text-white ml-1 text-slate-900 mb-4  xl:text-lg">
        Change Password
      </h3>
      <div className="dark:bg-slate-900 bg-white rounded-md shadow-sm">
        <form className="py-8 px-6 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="password"
              className="block mb-3 text-sm font-medium text-gray-900 dark:text-gray-100 xl:text-base"
            >
              Password
              <span className="float-right text-red-700 ">
                {errors?.password?.message && (errors.password.message as string)}
              </span>
            </label>
            <input
              type="password"
              id="password"
              disabled={isUpdating}
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 5,
                  message: "Password needs to have at least 5 characters",
                },
              })}
              autoComplete="new-password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 disabled:bg-gray-200 disabled:cursor-not-allowed"
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block mb-3 text-sm font-medium text-gray-900 dark:text-gray-100  xl:text-base"
            >
              Repeat password
              <span className="float-right text-red-700 ">
                {errors?.confirmPassword?.message &&
                  (errors.confirmPassword.message as string)}
              </span>
            </label>
            <input
              type="password"
              id="confirmPassword"
              disabled={isUpdating}
              {...register("confirmPassword", {
                required: "This field is required",
                validate: (value) =>
                  value === getValues().password || "Passwords do not match",
              })}
              autoComplete="new-password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 disabled:bg-gray-200 disabled:cursor-not-allowed "
            />
          </div>
          <div className="space-y-4">
            <button
              type="submit"
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none  dark:focus:ring-blue-800 font-medium rounded-md text-sm w-full sm:w-auto px-6 py-3 text-center flex-1 disabled:bg-gray-200 disabled:cursor-not-allowed xl:text-base"
              disabled={isUpdating}
            >
              Update password
            </button>
            <button
              type="reset"
              className="text-gray-900 bg-gray-100 sm:ml-5 hover:bg-gray-200 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-6 py-3  text-center flex-1 disabled:bg-gray-200 disabled:cursor-not-allowed xl:text-base"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </article>
  );
};

export default UpdateUserPassword;

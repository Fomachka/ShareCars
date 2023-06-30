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
    <form className="py-8 px-6 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 "
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
          className="block mb-2 text-sm font-medium text-gray-900 "
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
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 disabled:bg-gray-200 disabled:cursor-not-allowed"
        />
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-6 py-3 text-center flex-1 disabled:bg-gray-200 disabled:cursor-not-allowed"
        disabled={isUpdating}
      >
        Update Password
      </button>
      <button
        type="reset"
        className="text-gray-900 bg-gray-100 ml-5 hover:bg-gray-200 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-6 py-3 text-center flex-1 disabled:bg-gray-200 disabled:cursor-not-allowed"
      >
        Cancel
      </button>
    </form>
  );
};

export default UpdateUserPassword;

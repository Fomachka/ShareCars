import { SubmitHandler, useForm } from "react-hook-form";
import useSignup from "../authentication/hooks/useSignup";

type FormValues = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

const CreateUser = () => {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { signup, isLoading } = useSignup();
  const { errors } = formState;

  const onSubmit: SubmitHandler<FormValues> = ({
    firstName,
    lastName,
    email,
    password,
  }) => {
    signup(
      {
        firstName: firstName as string,
        lastName: lastName as string,
        email: email as string,
        password: password as string,
      },
      {
        onSettled: () => reset(),
      }
    );
  };

  return (
    <form
      className="space-y-6 p-6 rounded-lg max-w-[750px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <label
          htmlFor="firstName"
          className="block mb-2 text-sm xl:text-base font-medium text-gray-900 dark:text-gray-100 "
        >
          First name{" "}
          <span className="float-right text-red-700">
            {errors?.firstName?.message && (errors.firstName.message as string)}
          </span>
        </label>
        <input
          type="text"
          id="firstName"
          disabled={isLoading}
          {...register("firstName", {
            required: "This field is required",
          })}
          autoComplete="given-name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
        />
      </div>
      <div>
        <label
          htmlFor="lastName"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100 xl:text-base"
        >
          Last name{" "}
          <span className="float-right text-red-700 ">
            {errors?.lastName?.message && (errors.lastName.message as string)}
          </span>
        </label>
        <input
          type="text"
          id="lastName"
          disabled={isLoading}
          {...register("lastName", {
            required: "This field is required",
          })}
          autoComplete="family-name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100 xl:text-base "
        >
          Email{" "}
          <span className="float-right text-red-700 ">
            {errors?.email?.message && (errors.email.message as string)}
          </span>
        </label>
        <input
          type="text"
          id="email"
          disabled={isLoading}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Please provide a valid email address",
            },
          })}
          autoComplete="off"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100 xl:text-base "
        >
          Password
          <span className="float-right text-red-700 ">
            {errors?.password?.message && (errors.password.message as string)}
          </span>
        </label>
        <input
          type="password"
          id="password"
          disabled={isLoading}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 5,
              message: "Password needs to have at least 5 characters",
            },
          })}
          autoComplete="new-password"
          className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 "
        />
      </div>
      <div>
        <label
          htmlFor="confirmPassword"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100 xl:text-base"
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
          disabled={isLoading}
          {...register("confirmPassword", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords do not match",
          })}
          autoComplete="new-password"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 text-sm"
        />
      </div>

      <div className="space-y-4">
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-6 py-3 text-center flex-1 "
          disabled={isLoading}
        >
          Create New User
        </button>
        <button
          type="reset"
          className="text-gray-900 bg-gray-100 sm:ml-5 hover:bg-gray-200 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-6 py-3 text-center flex-1 "
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreateUser;
